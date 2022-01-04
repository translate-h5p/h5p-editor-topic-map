import * as React from "react";
import { t } from "../../h5p/H5P.util";
import { ArrowItemType } from "../../types/ArrowItemType";
import { H5PField } from "../../types/h5p/H5PField";
import { H5PForm } from "../../types/h5p/H5PForm";
import { Params } from "../../types/h5p/Params";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { Dialog } from "../Dialog/Dialog";
import { Grid } from "../Grid/Grid";
import { Toolbar, ToolbarButtonType } from "../Toolbar/Toolbar";
import { TopicMapItemForm } from "../TopicMapItemForm/TopicMapItemForm";
import styles from "./MapEditorView.module.scss";

export type MapEditorViewProps = {
  numberOfColumns?: number;
  numberOfRows?: number;
  gapSize?: number;
  initialGridItems: Array<TopicMapItemType>;
  initialArrowItems: Array<ArrowItemType>;
  updateItems: (items: Array<TopicMapItemType>) => void;
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
  const [editedItem, setEditedItem] = React.useState<string | null>();

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

  const topicMapItemFormDialogTitle = t("map-editor-view_item-dialog-title");

  return (
    <div className={styles.mapEditorView}>
      <Toolbar
        setActiveTool={setActive}
        activeTool={activeTool}
        isArrowButtonDisabled={gridItems.length < 2}
      />
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
          setEditedItem={setEditedItem}
        />
        <Dialog
          isOpen={Boolean(semantics && editedItem)}
          title={topicMapItemFormDialogTitle}
          onOpenChange={isOpen => {
            if (!isOpen) {
              setEditedItem(null);
            }
          }}
        >
          {editedItem && (
            <TopicMapItemForm
              itemId={editedItem}
              semantics={semantics}
              params={params}
              parent={parent}
              onSave={newParams => {
                updateItems(newParams.topicMapItems ?? []);
                setEditedItem(null);
              }}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
};
