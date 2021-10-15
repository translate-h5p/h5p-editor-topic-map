import * as React from "react";
import styles from "./MapEditorView.module.scss";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { Toolbar, ToolbarButtonType } from "../Toolbar/Toolbar";
import { Grid } from "../Grid/Grid";
import { H5PField } from "../../types/h5p/H5PField";
import { Params } from "../../types/h5p/Params";
import { H5PForm } from "../../types/h5p/H5PForm";
import { ArrowItemType } from "../../types/ArrowItemType";

export type MapEditorViewProps = {
  numberOfColumns?: number;
  numberOfRows?: number;
  gapSize?: number;
  initialGridItems: Array<TopicMapItemType>;
  updateItems: (items: Array<TopicMapItemType>) => void;
  initialArrowItems: Array<ArrowItemType>;
  updateArrowItems: (items: Array<ArrowItemType>) => void;
  semantics: H5PField;
  params: Params;
  parent: H5PForm;
};

export const MapEditorView: React.FC<MapEditorViewProps> = ({
  numberOfColumns,
  numberOfRows,
  initialGridItems,
  updateItems,
  initialArrowItems,
  updateArrowItems,
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
  const [arrowItems, setArrowItems] = React.useState<Array<ArrowItemType>>(
    initialArrowItems ?? [],
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

  const updateArrows = React.useCallback(
    (items: Array<ArrowItemType>) => {
      updateArrowItems(items);
      setArrowItems(items);
    },
    [updateArrowItems],
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
          initialArrowItems={arrowItems}
          updateArrowItems={updateArrows}
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
