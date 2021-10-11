import * as React from "react";
import styles from "./MapEditorView.module.scss";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { Toolbar, ToolbarButtonType } from "../Toolbar/Toolbar";
import { Grid } from "../Grid/Grid";
import { H5PField } from "../../types/h5p/H5PField";
import { Params } from "../../types/h5p/Params";
import { H5PForm } from "../../types/h5p/H5PForm";

export type MapEditorViewProps = {
  numberOfColumns?: number;
  numberOfRows?: number;
  gapSize?: number;
  initialGridItems: Array<TopicMapItemType>;
  updateItems: (items: Array<TopicMapItemType>) => void;
  semantics: H5PField;
  params: Params;
  parent: H5PForm;
};

export const MapEditorView: React.FC<MapEditorViewProps> = ({
  numberOfColumns,
  numberOfRows,
  initialGridItems,
  updateItems,
  gapSize,
  semantics,
  params,
  parent,
}) => {
  const columns = numberOfColumns ?? 20;
  const rows = numberOfRows ?? 12;
  const defaultGapSize = 8;

  const [activeTool, setActiveTool] = React.useState<ToolbarButtonType | null>(
    null,
  );
  const [gridItems, setGridItems] = React.useState<Array<TopicMapItemType>>(
    initialGridItems ?? [],
  );

  const setActive = (newValue: ToolbarButtonType | null): void => {
    setActiveTool(newValue);
  };

  const update = React.useCallback(
    (items: Array<TopicMapItemType>) => {
      updateItems(items);
      setGridItems(items);
    },
    [updateItems],
  );

  return (
    <div className={styles.mapEditorView}>
      <Toolbar setActiveTool={setActive} activeTool={activeTool} />
      <div className={styles.gridBorder}>
        <Grid
          numberOfColumns={columns}
          numberOfRows={rows}
          initialItems={gridItems}
          updateItems={update}
          gapSize={gapSize ?? defaultGapSize}
          setActiveTool={setActive}
          activeTool={activeTool}
          semantics={semantics}
          params={params}
          parent={parent}
        />
      </div>
    </div>
  );
};
