import * as React from "react";
import styles from "./MapEditorView.module.scss";
import { TopicMapItem } from "../../types/TopicMapItem";
import { Toolbar } from "../Toolbar/Toolbar";
import { Grid } from "../Grid/Grid";

export type MapEditorViewProps = {
  numberOfColumns?: number;
  numberOfRows?: number;
  gridItems?: Array<TopicMapItem>;
};

export const MapEditorView: React.FC<MapEditorViewProps> = ({
  numberOfColumns,
  numberOfRows,
  gridItems,
}) => {
  const columns = numberOfColumns ?? 20;
  const rows = numberOfRows ?? 12;

  return (
    <div className={styles.mapEditorView}>
      <Toolbar />
      <div className={styles.gridBorder}>
        <Grid
          numberOfColumns={columns}
          numberOfRows={rows}
          items={gridItems ?? []}
        />
      </div>
    </div>
  );
};
