import * as React from "react";
import { GridIndicator } from "../GridIndicator/GridIndicator";
import styles from "./Grid.module.scss";
import { Draggable } from "../Draggable/Draggable";
import { Size } from "../../types/Size";
import { TopicMapItem } from "../../types/TopicMapItem";
import { Position } from "../../types/Position";
import { resizeItems, updateItem } from "../../utils/grid.utils";

export type GridProps = {
  numberOfColumns: number;
  numberOfRows: number;
  initialItems: Array<TopicMapItem>;
  updateItems: (items: Array<TopicMapItem>) => void;
  gapSize: number;
  children: never;
};

export const Grid: React.FC<GridProps> = ({
  numberOfColumns,
  numberOfRows,
  initialItems,
  updateItems,
  gapSize,
}) => {
  const [size, setSize] = React.useState<Size | null>();
  const [hasRendered, setHasRendered] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<Array<TopicMapItem>>(initialItems);

  const elementRef = React.useRef<HTMLDivElement>(null);

  /* TODO: Translate */
  const gridIndicatorLabel = "Click to create a new element";

  const gridIndicators = React.useMemo(
    () =>
      Array(numberOfColumns * numberOfRows)
        .fill(null)
        .map((_, index) => (
          <GridIndicator
            // eslint-disable-next-line react/no-array-index-key
            key={`grid-indicator-${index}`}
            label={gridIndicatorLabel}
            onClick={() => {
              console.info("Click grid indicator");
            }}
          />
        )),
    [numberOfColumns, numberOfRows],
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

  const scaleX = React.useCallback(
    (xPercentage: number) => {
      if (!size?.width) {
        throw new Error("Grid has no size.");
      }

      return (size.width * xPercentage) / 100;
    },
    [size?.width],
  );

  const scaleY = React.useCallback(
    (yPercentage: number) => {
      if (!size?.height) {
        throw new Error("Grid has no size.");
      }
      return (size.height * yPercentage) / 100;
    },
    [size?.height],
  );

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
    },
    [items, size, updateItems],
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
    },
    [items, size, updateItems],
  );

  const renderChildren = React.useCallback(() => {
    if (gapSize == null || gridIndicatorSize == null || size == null) {
      return null;
    }

    return items.map(item => (
      <Draggable
        key={item.id}
        initialXPosition={scaleX(item.xPercentagePosition)}
        initialYPosition={scaleY(item.yPercentagePosition)}
        updatePosition={newPosition => updateItemPosition(item, newPosition)}
        initialWidth={Math.abs(scaleX(item.widthPercentage))}
        initialHeight={Math.abs(scaleY(item.heightPercentage))}
        updateSize={newSize => updateItemSize(item, newSize)}
        gapSize={gapSize}
        gridIndicatorSize={gridIndicatorSize}
        gridSize={size}
      />
    ));
  }, [
    gapSize,
    gridIndicatorSize,
    size,
    items,
    scaleX,
    scaleY,
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
