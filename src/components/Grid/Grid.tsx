import * as React from "react";
import { GridIndicator } from "../GridIndicator/GridIndicator";
import styles from "./Grid.module.scss";
import { Draggable } from "../Draggable/Draggable";
import { Size } from "../../types/Size";
import { TopicMapItem } from "../../types/TopicMapItem";
import { Position } from "../../types/Position";
import {
  findOccupiedCells,
  mapTopicMapItemToElement,
  resizeItems,
  scaleX,
  scaleY,
  updateItem,
} from "../../utils/grid.utils";
import { OccupiedCell } from "../../types/OccupiedCell";
import { Element } from "../../types/Element";
import { ToolbarButtons } from "../Toolbar/Toolbar";

export type GridProps = {
  numberOfColumns: number;
  numberOfRows: number;
  initialItems: Array<TopicMapItem>;
  updateItems: (items: Array<TopicMapItem>) => void;
  gapSize: number;
  children?: never;
  activeTool: ToolbarButtons | null;
};

export const Grid: React.FC<GridProps> = ({
  numberOfColumns,
  numberOfRows,
  initialItems,
  updateItems,
  gapSize,
  activeTool,
}) => {
  const [size, setSize] = React.useState<Size | null>();
  const [hasRendered, setHasRendered] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<Array<TopicMapItem>>(initialItems);
  const [occupiedCells, setOccupiedCells] = React.useState<Array<OccupiedCell>>(
    [],
  );
  const [boxStartPosition, setBoxStartPosition] = React.useState<number | null>(
    null,
  );

  const elementRef = React.useRef<HTMLDivElement>(null);

  /* TODO: Translate */
  const gridIndicatorLabel = "Click to create a new element";

  const createBoxStart = React.useCallback((index: number) => {
    setBoxStartPosition(index);
  }, []);

  const createBoxEnd = React.useCallback(
    (indicatorIndex: number) => {
      if (activeTool === ToolbarButtons.CreateBox) {
        if (boxStartPosition == null) {
          throw new Error("Box start position is not defined.");
        }

        // Get x and y percentage position
        const x = boxStartPosition % numberOfColumns;
        const y = Math.floor(boxStartPosition / numberOfColumns);

        const xPercentagePosition = (x / numberOfColumns) * 100;
        const yPercentagePosition = (y / numberOfRows) * 100;

        // Get height percentage
        const yEnd = Math.floor(indicatorIndex / numberOfColumns);
        const yEndPercentagePosition = ((yEnd + 1) / numberOfRows) * 100;

        const heightPercentage = yEndPercentagePosition - yPercentagePosition;

        // Get width percentage
        const indicatorValue = indicatorIndex + 1;
        const lastIndexOnColumn = indicatorValue % numberOfColumns === 0;

        const xEnd = indicatorValue % numberOfColumns;
        const xEndPercentagePosition = lastIndexOnColumn
          ? 100
          : (xEnd / numberOfColumns) * 100;

        const widthPercentage = xEndPercentagePosition - xPercentagePosition;

        // Create box
        const id = (items.length + 1).toString(); // TODO: Generate unique id

        const newItem = {
          id,
          xPercentagePosition,
          yPercentagePosition,
          widthPercentage,
          heightPercentage,
        };

        const newItems = [...items, newItem];

        updateItems(newItems);
        setItems(newItems);
      }
    },
    [
      activeTool,
      boxStartPosition,
      numberOfColumns,
      numberOfRows,
      items,
      updateItems,
    ],
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
            label={gridIndicatorLabel}
            onClick={() => {
              console.info("Click grid indicator");
            }}
            onMouseDown={createBoxStart}
            onMouseUp={createBoxEnd}
          />
        )),
    // We need to update the value of grid indicators each time `activeTool` or `items`
    // are changed because they affect how the `gridIndicator` click events work.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [numberOfColumns, numberOfRows, activeTool, items, boxStartPosition],
  );

  const getGridIndicatorSize = React.useCallback(() => {
    if (!elementRef.current) {
      return 0;
    }

    const gridIndicator = elementRef.current.querySelector(".grid-indicator");
    if (!gridIndicator) {
      throw new Error("No grid indicators were rendered.");
    }

    const { width } = gridIndicator.getBoundingClientRect();
    return width;

    // The grid's size is updated by external factors,
    // but still affects the grid indicator size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const gridIndicatorSize = React.useMemo(getGridIndicatorSize, [
    gapSize,
    getGridIndicatorSize,
    elementRef.current,
  ]);

  const updateItemPosition = React.useCallback(
    (updatedItem: TopicMapItem, newPosition: Position) => {
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
        gridIndicatorSize,
      );

      // console.log({ elements, newOccupiedCells });

      setOccupiedCells(newOccupiedCells);
    },
    [gapSize, gridIndicatorSize, items, size, updateItems],
  );

  const updateItemSize = React.useCallback(
    (updatedItem: TopicMapItem, newSize: Size) => {
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
          gridIndicatorSize,
        ),
      );
    },
    [gapSize, gridIndicatorSize, items, size, updateItems],
  );

  const renderChildren = React.useCallback(() => {
    if (gapSize == null || gridIndicatorSize == null || size == null) {
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
        updateSize={newSize => updateItemSize(item, newSize)}
        gapSize={gapSize}
        gridIndicatorSize={gridIndicatorSize}
        gridSize={size}
        occupiedCells={occupiedCells}
      />
    ));
  }, [
    gapSize,
    gridIndicatorSize,
    size,
    items,
    occupiedCells,
    updateItemPosition,
    updateItemSize,
  ]);

  const resize = React.useCallback(() => {
    if (!elementRef.current) {
      return;
    }

    const { width, height } = elementRef.current.getBoundingClientRect();

    const isFirstRender = size == null;
    if (!isFirstRender) {
      const scaleFactor = size?.width / width;

      if (scaleFactor !== 1) {
        setItems(resizeItems(items, scaleFactor));
      }
    }

    setSize({ width, height });
  }, [items, size]);

  React.useEffect(() => {
    if (hasRendered) {
      return;
    }

    window.addEventListener("resize", resize);

    // Resize once on first render
    resize();
  }, [hasRendered, items, resize, size]);

  React.useEffect(() => {
    setHasRendered(true);
  }, []);

  React.useEffect(() => {
    resize();

    // The grid's number of rows/columns might be updated by external factors,
    // but still affects the grid indicator size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfColumns, numberOfRows]);

  React.useEffect(() => {
    if (!size) {
      return;
    }

    setOccupiedCells(
      findOccupiedCells(
        items.map(item => mapTopicMapItemToElement(item, size)),
        size.width,
        size.height,
        gapSize,
        gridIndicatorSize,
      ),
    );
  }, [gapSize, gridIndicatorSize, items, size]);

  return (
    <div
      ref={elementRef}
      role="application" /* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Application_Role */
      className={styles.grid}
      style={{
        aspectRatio: `${numberOfColumns} / ${numberOfRows}`,
        gap: `${gapSize}px`,
        gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
        gridTemplateRows: `repeat(${numberOfRows}, 1fr)`,
      }}
    >
      {renderChildren()}
      {gridIndicators}
    </div>
  );
};
