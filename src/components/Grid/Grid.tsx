import * as React from "react";
import { GridIndicator } from "../GridIndicator/GridIndicator";
import styles from "./Grid.module.scss";
import { Draggable } from "../Draggable/Draggable";
import { Size } from "../../types/Size";
import { TopicMapItem } from "../../types/TopicMapItem";

export type GridProps = {
  numberOfColumns: number;
  numberOfRows: number;
  items: Array<TopicMapItem>;
  children: never;
};

export const Grid: React.FC<GridProps> = ({
  numberOfColumns,
  numberOfRows,
  items,
}) => {
  const [size, setSize] = React.useState<Size | null>();
  const [gapSize, setGapSize] = React.useState<number | null>();

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
  }, []);

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

      return size.width * (xPercentage / 100);
    },
    [size?.width],
  );
  const scaleY = React.useCallback(
    (yPercentage: number) => {
      if (!size?.height) {
        throw new Error("Grid has no size.");
      }

      return size.height * (yPercentage / 100);
    },
    [size?.height],
  );

  const calculateXPercentage = React.useCallback(
    (xPxPosition: number) => {
      if (!size) {
        return 0;
      }

      return xPxPosition / size.width;
    },
    [size],
  );

  const calculateYPercentage = React.useCallback(
    (yPxPosition: number) => {
      if (!size) {
        return 0;
      }

      return yPxPosition / size.height;
    },
    [size],
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
        updatePosition={newPosition => {
          // eslint-disable-next-line no-param-reassign
          item.xPercentagePosition = calculateXPercentage(newPosition.x);
          // eslint-disable-next-line no-param-reassign
          item.yPercentagePosition = calculateYPercentage(newPosition.y);
        }}
        initialWidth={Math.abs(scaleX(item.xPercentageSize))}
        initialHeight={Math.abs(scaleY(item.yPercentageSize))}
        updateSize={newSize => {
          // eslint-disable-next-line no-param-reassign
          item.xPercentageSize = calculateXPercentage(newSize.width);
          // eslint-disable-next-line no-param-reassign
          item.yPercentageSize = calculateXPercentage(newSize.height);
        }}
        gapSize={gapSize}
        gridIndicatorSize={gridIndicatorSize}
        gridSize={size}
      />
    ));
  }, [
    calculateXPercentage,
    scaleX,
    calculateYPercentage,
    scaleY,
    gapSize,
    gridIndicatorSize,
    items,
    size,
  ]);

  const calculateGapSize = React.useCallback(
    (height: number, width: number) => {
      return Math.max(
        (width / numberOfColumns) * 0.25,
        (height / numberOfRows) * 0.25,
      );
    },
    [numberOfColumns, numberOfRows],
  );

  const resize = React.useCallback(() => {
    if (!elementRef.current) {
      return;
    }

    const { width, height } = elementRef.current.getBoundingClientRect();
    setSize({ width, height });
  }, []);

  React.useEffect(() => {
    if (!size) {
      return;
    }

    const { width, height } = size;
    setGapSize(calculateGapSize(width, height));
  }, [size, calculateGapSize]);

  React.useEffect(() => {
    const gridElement = elementRef.current;
    gridElement?.addEventListener("resize", resize);

    // Resize once on first render
    resize();

    return () => {
      gridElement?.removeEventListener("resize", resize);
    };
  }, [resize]);

  return (
    <div
      ref={elementRef}
      role="application" /* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Application_Role */
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
        gridTemplateRows: `repeat(${numberOfRows}, 1fr)`,
        aspectRatio: `${numberOfColumns} / ${numberOfRows}`,
      }}
    >
      {gridIndicators}
      {renderChildren()}
    </div>
  );
};
