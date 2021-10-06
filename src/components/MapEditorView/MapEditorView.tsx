import * as React from "react";
import styles from "./MapEditorView.module.scss";
import { TopicMapItem } from "../../types/TopicMapItem";
import { Toolbar, ToolbarButtonType } from "../Toolbar/Toolbar";
import { Grid } from "../Grid/Grid";

export type MapEditorViewProps = {
  numberOfColumns?: number;
  numberOfRows?: number;
  gapSize?: number;
  initialGridItems?: Array<TopicMapItem>;
  updateItems: (items: Array<TopicMapItem>) => void;
};

export const MapEditorView: React.FC<MapEditorViewProps> = ({
  numberOfColumns,
  numberOfRows,
  initialGridItems,
  updateItems,
  gapSize,
}) => {
  const columns = numberOfColumns ?? 20;
  const rows = numberOfRows ?? 12;
  const defaultGapSize = 8;

  const [activeTool, setActiveTool] = React.useState<ToolbarButtonType | null>(
    null,
  );
  const [gridItems, setGridItems] = React.useState<Array<TopicMapItem>>(
    initialGridItems ?? [],
  );

  const setActive = (newValue: ToolbarButtonType | null): void => {
    setActiveTool(newValue);
  };

  const update = React.useCallback(
    (items: Array<TopicMapItem>) => {
      updateItems(items);
      setGridItems(items);
    },
    [updateItems],
  );

  return (
    <div className={styles.mapEditorView}>
      <Toolbar 
        setActiveTool={setActive} 
        activeTool={activeTool}
      />
      <div className={styles.gridBorder}>
        <Grid
          numberOfColumns={columns}
          numberOfRows={rows}
          initialItems={gridItems}
          updateItems={update}
          gapSize={gapSize ?? defaultGapSize}
          setActiveTool={setActive}
          activeTool={activeTool}
        />
      </div>
    </div>
  );
};
