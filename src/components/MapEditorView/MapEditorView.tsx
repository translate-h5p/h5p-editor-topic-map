import * as React from "react";
import styles from "./MapEditorView.module.scss";
import { TopicMapItem } from "../../types/TopicMapItem";
import { Toolbar } from "../Toolbar/Toolbar";
import { Grid } from "../Grid/Grid";

export type MapEditorViewProps = {
  numberOfColumns?: number;
  numberOfRows?: number;
  gapSize?: number;
  gridItems?: Array<TopicMapItem>;
  updateItems: (items: Array<TopicMapItem>) => void;
};

export const MapEditorView: React.FC<MapEditorViewProps> = ({
  numberOfColumns,
  numberOfRows,
  gridItems,
  updateItems,
  gapSize,
}) => {
  const columns = numberOfColumns ?? 20;
  const rows = numberOfRows ?? 12;
  const defaultGapSize = 8;

  return (
    <div className={styles.mapEditorView}>
      <Toolbar />
      <div className={styles.gridBorder}>
        <Grid
          numberOfColumns={columns}
          numberOfRows={rows}
          initialItems={gridItems ?? []}
          updateItems={updateItems}
          gapSize={gapSize ?? defaultGapSize}
        />
      </div>
    </div>
  );
};
