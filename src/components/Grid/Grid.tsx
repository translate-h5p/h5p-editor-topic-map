import * as React from "react";
import { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import { Xwrapper } from "react-xarrows";
import { t } from "../../H5P/H5P.util";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { Element } from "../../types/Element";
import { OccupiedCell } from "../../types/OccupiedCell";
import { Position } from "../../types/Position";
import { ResizeDirection } from "../../types/ResizeDirection";
import { Size } from "../../types/Size";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import {
  createArrowItem,
  createTopicMapItem,
  findConnectedArrows,
  findHeightPercentage,
  findItem,
  findOccupiedCells,
  findWidthPercentage,
  isDraggingLeft,
  isDraggingUp,
  mapTopicMapItemToElement,
  positionIsFree,
  resizeItems,
  scaleX,
  scaleY,
  updateArrowType,
  updateItem,
} from "../../utils/grid.utils";
import { Arrow } from "../Arrow/Arrow";
import { Draggable } from "../Draggable/Draggable";
import { GridIndicator } from "../GridIndicator/GridIndicator";
import { ToolbarButtonType } from "../Toolbar/Toolbar";
import { TopicMapItem } from "../TopicMapItem/TopicMapItem";
import styles from "./Grid.module.scss";

export type GridProps = {
  numberOfColumns: number;
  numberOfRows: number;
  initialItems: Array<TopicMapItemType>;
  updateItems: (items: Array<TopicMapItemType>) => void;
  initialArrowItems?: Array<ArrowItemType>;
  updateArrowItems: (items: Array<ArrowItemType>) => void;
  gapSize: number;
  children?: never;
  setActiveTool: (newValue: ToolbarButtonType | null) => void;
  activeTool: ToolbarButtonType | null;
  setEditedItem: (itemId: string) => void;
  setEditedArrow: (itemId: string) => void;
};

export const Grid: React.FC<GridProps> = ({
  numberOfColumns,
  numberOfRows,
  initialItems,
  updateItems,
  initialArrowItems,
  updateArrowItems,
  gapSize,
  setActiveTool,
  activeTool,
  setEditedItem,
  setEditedArrow,
}) => {
  const [size, setSize] = useState<Size | null>(null);
  const [items, setItems] = useState(initialItems);
  const [arrowItems, setArrowItems] = useState(initialArrowItems ?? []);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [occupiedCells, setOccupiedCells] = useState<Array<OccupiedCell>>([]);
  const [boxStartIndex, setBoxStartIndex] = useState<number | null>(null);
  const [currentItemsLength, setCurrentItemsLength] = useState(items.length);
  const [isDragging, setIsDragging] = useState(false);
  const [resizedItemId, setResizedItemId] = useState<string | null>(null);
  const [resizeDirectionLock, setResizeDirectionLock] =
    useState<ResizeDirection>("none");
  const [mouseOutsideGrid, setMouseOutsideGrid] = useState(false);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [arrowStartId, setArrowStartId] = useState<string | null>(null);

  const elementRef = React.useRef<HTMLDivElement>(null);

  const setSelected = React.useCallback((newItem: string | null) => {
    setSelectedItem(newItem);
  }, []);

  const getCellSize = React.useCallback(() => {
    if (!elementRef.current) {
      return 0;
    }

    const gridIndicator = elementRef.current.querySelector(".grid-indicator");
    if (!gridIndicator) {
      throw new Error("No grid indicators were rendered.");
    }

    const { width } = gridIndicator.getBoundingClientRect();

    /**
     * This number might differ from browser to browser, but it's hopefully (😬) ok.
     * We use it to counteract floating point number errors.
     */
    const numberOfSignificantDigits = 4;

    return (
      Math.round(width * 10 ** numberOfSignificantDigits) /
      10 ** numberOfSignificantDigits
    );

    // The grid's size is updated by external factors,
    // but still affects the grid indicator size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const cellSize = React.useMemo(getCellSize, [
    gapSize,
    getCellSize,
    elementRef.current,
  ]);

  const updateItemSize = React.useCallback(
    (updatedItem: TopicMapItemType, newSize: Size) => {
      if (!size) {
        throw new Error("Grid has no size.");
      }

      const newItems = updateItem(items, updatedItem, size.width, size.height, {
        newSize,
      });

      updateItems(newItems);
      setItems(newItems);

      setOccupiedCells(
        findOccupiedCells(
          items.map(item => mapTopicMapItemToElement(item, size)),
          size.width,
          size.height,
          gapSize,
          cellSize,
        ),
      );
    },
    [gapSize, cellSize, items, size, updateItems],
  );

  const createArrow = React.useCallback(
    (elementId: string) => {
      const isCreatingNewArrow = activeTool === ToolbarButtonType.CreateArrow;
      if (!isCreatingNewArrow) {
        return;
      }

      const hasStartElementId = !!arrowStartId;
      if (!hasStartElementId) {
        setArrowStartId(elementId);
        return;
      }

      const startsAndEndsAtSameElement = arrowStartId === elementId;

      const arrowExistsAlready =
        arrowItems.find(
          ({ startElementId, endElementId }) =>
            (startElementId === arrowStartId && endElementId === elementId) ||
            (startElementId === elementId && endElementId === arrowStartId),
        ) != null;

      if (!arrowExistsAlready && !startsAndEndsAtSameElement && arrowStartId) {
        const newItem = createArrowItem(arrowStartId, elementId);
        const newItems = [...arrowItems, newItem];

        updateArrowItems(newItems);
        setArrowItems(newItems);
      }

      setActiveTool(null);
      setArrowStartId(null);
    },
    [activeTool, arrowItems, arrowStartId, setActiveTool, updateArrowItems],
  );

  const createBoxStart = React.useCallback(
    (index: number) => {
      if (activeTool === ToolbarButtonType.CreateBox) {
        setBoxStartIndex(index);
        setIsDragging(true);
      }
    },
    [activeTool],
  );

  const createBoxEnd = React.useCallback(() => {
    if (activeTool === ToolbarButtonType.CreateBox) {
      setIsDragging(false);
      setBoxStartIndex(null);
      setCurrentItemsLength(items.length);
      setActiveTool(null);

      if (items[currentItemsLength]) {
        setSelectedItem(items[currentItemsLength].id);
      }
    }
  }, [activeTool, items, setActiveTool, currentItemsLength]);

  const resizeBoxEnd = React.useCallback(() => {
    setPrevIndex(null);
    setResizedItemId(null);
    setBoxStartIndex(null);
    setResizeDirectionLock("none");
  }, []);

  const createBoxEnter = React.useCallback(
    (indicatorIndex: number) => {
      const isCreatingNewBox =
        activeTool === ToolbarButtonType.CreateBox && isDragging;
      if (!isCreatingNewBox) {
        return;
      }

      if (boxStartIndex == null) {
        throw new Error("Box start position is not defined.");
      }

      if (!size) {
        throw new Error("Grid has no size.");
      }

      const dragLeft = isDraggingLeft(
        indicatorIndex,
        boxStartIndex,
        numberOfColumns,
      );
      const dragUp = isDraggingUp(
        indicatorIndex,
        boxStartIndex,
        numberOfColumns,
        numberOfRows,
      );

      // Get x and y percentage position
      const x = dragLeft
        ? indicatorIndex % numberOfColumns
        : boxStartIndex % numberOfColumns;
      const y = dragUp
        ? Math.floor(indicatorIndex / numberOfColumns)
        : Math.floor(boxStartIndex / numberOfColumns);

      const xPercentagePosition = (x / numberOfColumns) * 100;
      const yPercentagePosition = (y / numberOfRows) * 100;

      // Get height percentage
      const yEnd = dragUp
        ? Math.floor(boxStartIndex / numberOfColumns)
        : Math.floor(indicatorIndex / numberOfColumns);
      const yEndPercentagePosition = ((yEnd + 1) / numberOfRows) * 100;

      const heightPercentage = yEndPercentagePosition - yPercentagePosition;

      // Get width percentage
      const indicatorValue = dragLeft ? boxStartIndex + 1 : indicatorIndex + 1;
      const lastIndexOnColumn = indicatorValue % numberOfColumns === 0;

      const xEnd = indicatorValue % numberOfColumns;
      const xEndPercentagePosition = lastIndexOnColumn
        ? 100
        : (xEnd / numberOfColumns) * 100;

      const widthPercentage = xEndPercentagePosition - xPercentagePosition;

      // Create box
      const alreadyAdded =
        items.length !== currentItemsLength &&
        items[currentItemsLength] != null;

      const newItem = createTopicMapItem();
      newItem.xPercentagePosition = xPercentagePosition;
      newItem.widthPercentage = widthPercentage;
      newItem.yPercentagePosition = yPercentagePosition;
      newItem.heightPercentage = heightPercentage;

      const newPosition = {
        x: scaleX(xPercentagePosition, size.width),
        y: scaleY(yPercentagePosition, size.height),
      };
      const newSize = {
        width: scaleX(widthPercentage, size.width),
        height: scaleY(heightPercentage, size.height),
      };

      const lastItem = items[currentItemsLength];
      const posIsFree = positionIsFree(
        newPosition,
        alreadyAdded ? lastItem.id : newItem.id,
        newSize,
        size,
        gapSize,
        cellSize,
        occupiedCells,
      );

      if (posIsFree && !alreadyAdded) {
        const newItems = [...items, newItem];

        updateItems(newItems);
        setItems(newItems);
      }

      if (posIsFree && alreadyAdded) {
        if (dragLeft || dragUp) {
          const newItems = updateItem(
            items,
            lastItem,
            size.width,
            size.height,
            { newPosition, newSize },
          );

          updateItems(newItems);
          setItems(newItems);
        } else {
          updateItemSize(lastItem, newSize);
        }
      }
    },
    [
      activeTool,
      isDragging,
      boxStartIndex,
      size,
      numberOfColumns,
      numberOfRows,
      currentItemsLength,
      items,
      gapSize,
      cellSize,
      occupiedCells,
      updateItems,
      updateItemSize,
    ],
  );

  const resizeBoxEnter = React.useCallback(
    (indicatorIndex: number) => {
      const isResizing = resizedItemId != null;
      if (!isResizing) {
        return;
      }

      if (boxStartIndex == null) {
        throw new Error("Box start position is not defined.");
      }

      if (!size) {
        throw new Error("Grid has no size.");
      }

      const existingItem = findItem(resizedItemId, items);
      if (!existingItem) {
        throw new Error(
          `Resized item with id "${resizedItemId}" does not exist`,
        );
      }

      const dragLeft =
        indicatorIndex % numberOfColumns <
        (prevIndex ?? indicatorIndex) % numberOfColumns;
      const dragUp = (prevIndex ?? indicatorIndex) >= indicatorIndex;

      const onlyScaleVertically = resizeDirectionLock.includes("horizontal");
      const onlyScaleHorizontally = resizeDirectionLock.includes("vertical");

      const leftHandle = resizeDirectionLock.includes("left");
      const topHandle = resizeDirectionLock.includes("top");

      // Get x and y percentage position
      const x = leftHandle
        ? indicatorIndex % numberOfColumns
        : boxStartIndex % numberOfColumns;

      const y = topHandle
        ? Math.floor(indicatorIndex / numberOfColumns)
        : Math.floor(boxStartIndex / numberOfColumns);

      const xPercentagePosition = onlyScaleVertically
        ? existingItem.xPercentagePosition
        : (x / numberOfColumns) * 100;
      const yPercentagePosition = onlyScaleHorizontally
        ? existingItem.yPercentagePosition
        : (y / numberOfRows) * 100;

      // Get height percentage
      const yEnd = topHandle
        ? Math.floor(
            (boxStartIndex + existingItem.widthPercentage) / numberOfColumns,
          )
        : Math.floor(indicatorIndex / numberOfColumns);
      const yEndPercentagePosition = ((yEnd + 1) / numberOfRows) * 100;

      const heightPercentage = findHeightPercentage(
        onlyScaleHorizontally,
        topHandle,
        dragUp,
        existingItem,
        yPercentagePosition,
        yEndPercentagePosition,
      );

      // Get width percentage
      const indicatorValue = indicatorIndex + 1;
      const lastIndexOnColumn = indicatorValue % numberOfColumns === 0;

      const xEnd = indicatorValue % numberOfColumns;
      const xEndPercentagePosition = lastIndexOnColumn
        ? 100
        : (xEnd / numberOfColumns) * 100;

      const widthPercentage = findWidthPercentage(
        onlyScaleVertically,
        leftHandle,
        dragLeft,
        existingItem,
        xPercentagePosition,
        xEndPercentagePosition,
      );

      const newPosition = {
        x: scaleX(xPercentagePosition, size.width),
        y: scaleY(yPercentagePosition, size.height),
      };
      const newSize = {
        width: scaleX(widthPercentage, size.width),
        height: scaleY(heightPercentage, size.height),
      };

      setPrevIndex(indicatorIndex);

      const posIsFree = positionIsFree(
        newPosition,
        existingItem.id,
        newSize,
        size,
        gapSize,
        cellSize,
        occupiedCells,
      );

      if (posIsFree && isResizing) {
        if (leftHandle || topHandle) {
          const newItems = updateItem(
            items,
            existingItem,
            size.width,
            size.height,
            { newPosition, newSize },
          );

          updateItems(newItems);
          setItems(newItems);
        } else {
          updateItemSize(existingItem, newSize);
        }
      }
    },
    [
      resizedItemId,
      boxStartIndex,
      size,
      numberOfColumns,
      numberOfRows,
      items,
      gapSize,
      cellSize,
      occupiedCells,
      updateItems,
      resizeDirectionLock,
      updateItemSize,
      prevIndex,
    ],
  );

  const cancelActions = React.useCallback(() => {
    const isCreatingNewBox =
      activeTool === ToolbarButtonType.CreateBox && isDragging;
    const isCreatingNewArrow =
      activeTool === ToolbarButtonType.CreateArrow && isDragging;
    const isResizing = resizedItemId != null;

    if (isCreatingNewBox) {
      createBoxEnd();
    } else if (isCreatingNewArrow) {
      setArrowStartId(null);
    }

    if (isResizing) {
      resizeBoxEnd();
    }
    if (!mouseOutsideGrid) {
      setMouseOutsideGrid(true);
    }
  }, [
    activeTool,
    isDragging,
    resizedItemId,
    createBoxEnd,
    resizeBoxEnd,
    mouseOutsideGrid,
  ]);

  const activeHoverOnGrid = React.useMemo(
    () =>
      activeTool === ToolbarButtonType.CreateArrow ||
      activeTool === ToolbarButtonType.CreateBox,
    [activeTool],
  );

  const onGridIndicatorMouseEnter = React.useCallback(
    (indicatorIndex: number) => {
      const isResizing = resizedItemId != null;
      if (isResizing) {
        resizeBoxEnter(indicatorIndex);
      }
      if (activeTool === ToolbarButtonType.CreateBox) {
        createBoxEnter(indicatorIndex);
      }
    },
    [activeTool, createBoxEnter, resizeBoxEnter, resizedItemId],
  );

  const gridIndicators = React.useMemo(
    () =>
      Array(numberOfColumns * numberOfRows)
        .fill(null)
        .map((_, index) => (
          <GridIndicator
            // eslint-disable-next-line react/no-array-index-key
            key={`grid-indicator-${index}`}
            index={index}
            onMouseDown={createBoxStart}
            onMouseEnter={onGridIndicatorMouseEnter}
            label={t("grid-indicator_label")}
          />
        )),
    // We need to update the value of grid indicators each time `activeTool` or `items`
    // are changed because they affect how the `gridIndicator` click events work.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      numberOfColumns,
      numberOfRows,
      activeTool,
      items,
      boxStartIndex,
      activeHoverOnGrid,
      currentItemsLength,
      isDragging,
    ],
  );

  const updateItemPosition = React.useCallback(
    (updatedItem: TopicMapItemType, newPosition: Position) => {
      if (!size) {
        throw new Error("Grid has no size.");
      }

      const newItems = updateItem(items, updatedItem, size.width, size.height, {
        newPosition,
      });

      updateItems(newItems);
      setItems(newItems);

      const elements: Array<Element> = items.map(item =>
        mapTopicMapItemToElement(item, size),
      );

      const newOccupiedCells = findOccupiedCells(
        elements,
        size.width,
        size.height,
        gapSize,
        cellSize,
      );

      setOccupiedCells(newOccupiedCells);
    },
    [size, items, updateItems, gapSize, cellSize],
  );

  const editItem = React.useCallback(
    (id: string) => {
      if (!activeTool) {
        setEditedItem(id);
      }
    },
    [activeTool, setEditedItem],
  );

  const editArrow = React.useCallback(
    (id: string) => {
      if (!activeTool) {
        setEditedArrow(id);
      }
    },
    [activeTool, setEditedArrow],
  );

  const deleteArrow = React.useCallback(
    (id: string) => {
      /* TODO: Add dialog to confirm delete */
      const newItems = arrowItems.filter(item => item.id !== id);

      updateArrowItems(newItems);
      setArrowItems(newItems);
    },
    [arrowItems, updateArrowItems],
  );

  const deleteItem = React.useCallback(
    (id: string) => {
      /* TODO: Add dialog to confirm delete */
      const newItems = items.filter(item => item.id !== id);

      const connectedArrows = findConnectedArrows(id, arrowItems);
      connectedArrows.forEach(item => deleteItem(item.id));

      updateItems(newItems);
      setItems(newItems);
      setCurrentItemsLength(newItems.length);
    },
    [arrowItems, items, updateItems],
  );

  const setArrowType = React.useCallback(
    (type: ArrowType, id: string) => {
      const updatedItem = arrowItems.find(item => item.id === id);

      if (!updatedItem) {
        throw new Error(`Updated arrow with id "${id}" does not exist`);
      }

      const newItems = updateArrowType(arrowItems, updatedItem, type);

      updateArrowItems(newItems);
      setArrowItems(newItems);
    },
    [arrowItems, updateArrowItems],
  );

  const children = React.useMemo(() => {
    if (gapSize == null || cellSize == null || size == null) {
      return null;
    }

    return items.map(item => (
      <Draggable
        key={item.id}
        id={item.id}
        initialXPosition={scaleX(item.xPercentagePosition, size.width)}
        initialYPosition={scaleY(item.yPercentagePosition, size.height)}
        updatePosition={newPosition => updateItemPosition(item, newPosition)}
        initialWidth={Math.abs(scaleX(item.widthPercentage, size.width))}
        initialHeight={Math.abs(scaleY(item.heightPercentage, size.height))}
        gapSize={gapSize}
        cellSize={cellSize}
        gridSize={size}
        occupiedCells={occupiedCells}
        isPreview={isDragging}
        editItem={editItem}
        deleteItem={deleteItem}
        setSelectedItem={setSelected}
        selectedItem={selectedItem}
        startResize={directionLock => {
          const x = Math.floor(
            (item.xPercentagePosition / 100) * numberOfColumns,
          );
          const y = Math.floor((item.yPercentagePosition / 100) * numberOfRows);
          const cellIndex = x + y * numberOfColumns;

          setBoxStartIndex(cellIndex);
          setResizedItemId(item.id);
          setResizeDirectionLock(directionLock);
        }}
        mouseOutsideGrid={mouseOutsideGrid}
        showScaleHandles
        onPointerDown={() => createArrow(item.id)}
      >
        <TopicMapItem item={item} />
      </Draggable>
    ));
  }, [
    gapSize,
    cellSize,
    size,
    items,
    occupiedCells,
    isDragging,
    editItem,
    deleteItem,
    setSelected,
    selectedItem,
    mouseOutsideGrid,
    updateItemPosition,
    numberOfColumns,
    numberOfRows,
    createArrow,
  ]);

  const childrenArrows = React.useMemo(
    () =>
      arrowItems.map(item => (
        <Arrow
          key={item.id}
          cellSize={cellSize}
          item={item}
          deleteItem={deleteArrow}
          editItem={editArrow}
          selectedItemId={selectedItem}
          setSelectedItemId={setSelectedItem}
          updateArrowType={setArrowType}
        />
      )),
    [arrowItems, cellSize, deleteArrow, editArrow, selectedItem, setArrowType],
  );

  const resize = React.useCallback(() => {
    window.requestAnimationFrame(() => {
      if (!elementRef.current) {
        return;
      }

      const { width, height } = elementRef.current.getBoundingClientRect();

      const isFirstRender = size == null;
      if (!isFirstRender) {
        const scaleFactor = size.width / width;

        if (scaleFactor !== 1) {
          setItems(resizeItems(items, scaleFactor));
        }
      }

      setSize({ width, height });
    });
  }, [items, size]);

  useEffectOnce(() => {
    const windowClickListener = (event: MouseEvent | TouchEvent): void => {
      const draggableWasClicked = !!(event.target as HTMLElement).closest(
        ".draggable",
      );

      if (!draggableWasClicked) {
        setSelectedItem(null);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousedown", windowClickListener);
    window.addEventListener("touchstart", windowClickListener);

    // Resize once on first render
    resize();
  });

  useEffect(() => {
    resize();

    // The grid's number of rows/columns might be updated by external factors,
    // but still affects the cell size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfColumns, numberOfRows]);

  useEffect(() => {
    if (!size) {
      return;
    }

    setOccupiedCells(
      findOccupiedCells(
        items.map(item => mapTopicMapItemToElement(item, size)),
        size.width,
        size.height,
        gapSize,
        cellSize,
      ),
    );
  }, [gapSize, cellSize, items, size]);

  useEffect(() => {
    const isCreatingArrow = activeTool === ToolbarButtonType.CreateArrow;
    if (!isCreatingArrow) {
      setArrowStartId(null);
    }
  }, [activeTool]);

  return (
    <Xwrapper>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={elementRef}
        role="application" /* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Application_Role */
        className={
          styles.grid +
          (activeHoverOnGrid ? ` ${styles.gridIndicatorsActive}` : "")
        }
        style={{
          // @ts-expect-error Custom properties should be allowed
          "--gap-size": `${gapSize}px`,
          gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
          gridTemplateRows: `repeat(${numberOfRows}, 1fr)`,
          cursor: isDragging ? "pointer" : "auto",
        }}
        onMouseUp={() => {
          createBoxEnd();
          resizeBoxEnd();
        }}
        onMouseLeave={() => cancelActions()}
        onMouseEnter={() => {
          if (mouseOutsideGrid) {
            setMouseOutsideGrid(false);
          }
        }}
      >
        {childrenArrows}
        {children}
        {gridIndicators}
      </div>
    </Xwrapper>
  );
};
