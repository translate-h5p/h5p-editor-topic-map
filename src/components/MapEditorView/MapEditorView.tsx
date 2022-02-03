import * as React from "react";
import { useState } from "react";
import { t } from "../../H5P/H5P.util";
import { ArrowItemType } from "../../types/ArrowItemType";
import { H5PFieldGroup } from "../../types/H5P/H5PField";
import { H5PForm } from "../../types/H5P/H5PForm";
import { Params } from "../../types/H5P/Params";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { getBackgroundImageField } from "../../utils/H5P/form.utils";
import { ArrowItemForm } from "../ArrowItemForm/ArrowItemForm";
import { Dialog } from "../Dialog/Dialog";
import { Grid } from "../Grid/Grid";
import { Toolbar, ToolbarButtonType } from "../Toolbar/Toolbar";
import { TopicMapItemForm } from "../TopicMapItemForm/TopicMapItemForm";
import styles from "./MapEditorView.module.scss";

export type MapEditorViewProps = {
  gapSize?: number;
  numberOfColumns?: number;
  numberOfRows?: number;
  params: Params;
  parent: H5PForm;
  semantics: H5PFieldGroup;
  setParams: (updatedParams: Partial<Params>) => void;
};

export const MapEditorView: React.FC<MapEditorViewProps> = ({
  gapSize,
  numberOfColumns,
  numberOfRows,
  params,
  parent,
  semantics,
  setParams,
}) => {
  const columns = numberOfColumns ?? 30;
  const rows = numberOfRows ?? 18;
  const defaultGapSize = 4;

  const [activeTool, setActiveTool] = useState<ToolbarButtonType | null>(null);
  const [gridItems, setGridItems] = useState(params.topicMapItems ?? []);
  const [arrowItems, setArrowItems] = useState(params.arrowItems ?? []);
  const [editedItem, setEditedItem] = useState<string | null>(null);
  const [editedArrow, setEditedArrow] = useState<string | null>(null);

  const setActive = (newValue: ToolbarButtonType | null): void => {
    setActiveTool(newValue);
  };

  const updateItems = React.useCallback(
    (items: Array<TopicMapItemType>) => {
      setParams({ topicMapItems: items });
      setGridItems(items);
    },
    [setParams],
  );

  const updateArrows = React.useCallback(
    (items: Array<ArrowItemType>) => {
      setParams({ arrowItems: items });
      setArrowItems(items);
    },
    [setParams],
  );

  const topicMapItemFormDialogTitle = t("map-editor-view_item-dialog-title");
  const backgroundImageField = React.useMemo(() => {
    const bgImgField = getBackgroundImageField(semantics);

    if (!bgImgField) {
      throw new Error(
        "Background image field not found. Was it removed from semantics, or did its name change?",
      );
    }

    return bgImgField;
  }, [semantics]);

  return (
    <div className={styles.mapEditorView}>
      <Toolbar
        setActiveTool={setActive}
        activeTool={activeTool}
        isArrowButtonDisabled={gridItems.length < 2}
        setParams={setParams}
        params={params}
        parent={parent}
        backgroundImageField={backgroundImageField}
      />
      <div className={styles.gridBorder}>
        <Grid
          numberOfColumns={columns}
          numberOfRows={rows}
          initialItems={gridItems}
          updateItems={updateItems}
          initialArrowItems={arrowItems}
          updateArrowItems={updateArrows}
          gapSize={gapSize ?? defaultGapSize}
          setActiveTool={setActive}
          activeTool={activeTool}
          setEditedItem={setEditedItem}
          setEditedArrow={setEditedArrow}
        />
        <Dialog
          isOpen={Boolean(semantics && (editedItem || editedArrow))}
          title={topicMapItemFormDialogTitle}
          size="large"
          onOpenChange={isOpen => {
            if (!isOpen) {
              setEditedItem(null);
              setEditedArrow(null);
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

          {editedArrow && (
            <ArrowItemForm
              itemId={editedArrow}
              semantics={semantics}
              params={params}
              parent={parent}
              onSave={newParams => {
                updateArrows(newParams.arrowItems ?? []);
                setEditedArrow(null);
              }}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
};
