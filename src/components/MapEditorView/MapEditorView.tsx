import * as React from "react";
import { useState } from "react";
import { getImageUrl, t } from "../../H5P/H5P.util";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ClassicArrowItemType } from "../../types/ClassicArrowItemType";
import { H5PFieldGroup } from "../../types/H5P/H5PField";
import { H5PForm } from "../../types/H5P/H5PForm";
import { Params } from "../../types/H5P/Params";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { findConnectedArrows } from "../../utils/grid.utils";
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
  const columns = numberOfColumns ?? 31;
  const rows = numberOfRows ?? 19;
  const defaultGapSize = 4;

  const [activeTool, setActiveTool] = useState<ToolbarButtonType | null>(null);
  const [gridItems, setGridItems] = useState(params.topicMapItems ?? []);
  const [arrowItems, setArrowItems] = useState(params.arrowItems ?? []);
  const [classicArrowItems, setClassicArrowItems] = useState(params.classicArrowItems ?? []);
  const [editedItem, setEditedItem] = useState<string | null>(null);
  const [deletedItem, setDeletedItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentItemsLength, setCurrentItemsLength] = useState(
    gridItems.length,
  );
  const [editedArrow, setEditedArrow] = useState<string | null>(null);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);
  const updateGrid = React.useRef((newItems: TopicMapItemType[]): void =>
    updateGrid.current(newItems),
  );

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

  const updateClassicArrows = React.useCallback(
    (items: Array<ClassicArrowItemType>) => {
      setParams({ classicArrowItems: items });
      setClassicArrowItems(items);
    },
    [setParams],
  );

  const openDeleteDialogue = React.useCallback((itemId: string) => {
    setDeletedItem(itemId);
    setShowDeleteConfirmationDialog(true);
  }, []);

  const deleteArrow = React.useCallback(
    (id: string) => {
      const newItems = arrowItems.filter(item => item.id !== id);

      updateArrows(newItems);
      setArrowItems(newItems);
    },
    [arrowItems, updateArrows],
  );

  const deleteItem = React.useCallback(() => {
    const newItems = gridItems.filter(item => item.id !== deletedItem);

    const connectedArrows = findConnectedArrows(deletedItem ?? "", arrowItems);
    connectedArrows.forEach(item => deleteArrow(item.id));

    updateItems(newItems);
    setGridItems(newItems);
    updateGrid.current(newItems);
    setShowDeleteConfirmationDialog(false);
    setSelectedItem(null);
    setCurrentItemsLength(newItems.length);
  }, [arrowItems, deleteArrow, deletedItem, gridItems, updateItems]);

  const denyDeletion = React.useCallback(() => {
    setShowDeleteConfirmationDialog(false);
    setSelectedItem(null);
  }, []);

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

  const backgroundImage: string | undefined = params.gridBackgroundImage?.path
    ? `url(${getImageUrl(params.gridBackgroundImage?.path)})`
    : undefined;

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
      <div
        className={`${styles.gridBorder} ${
          backgroundImage ? styles.backgroundImage : ""
        }`}
        style={{ backgroundImage }}
      >
        <Grid
          numberOfColumns={columns}
          numberOfRows={rows}
          initialItems={gridItems}
          updateItems={updateItems}
          initialArrowItems={arrowItems}
          updateArrowItems={updateArrows}
          updateClassicArrowItems={updateClassicArrows}
          gapSize={gapSize ?? defaultGapSize}
          setActiveTool={setActive}
          activeTool={activeTool}
          setEditedItem={setEditedItem}
          setEditedArrow={setEditedArrow}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          openDeleteDialogue={openDeleteDialogue}
          updateGrid={updateGrid}
          currentItemsLength={currentItemsLength}
          setCurrentItemsLength={setCurrentItemsLength}
        />
        <Dialog
          isOpen={showDeleteConfirmationDialog}
          title={t("draggable_delete-confirmation")}
          onOpenChange={isOpen => {
            if (!isOpen) {
              setDeletedItem(null);
              denyDeletion();
            }
          }}
          size="medium"
        >
          <div className={styles.deleteConfirmationButtons}>
            <button
              type="button"
              className={styles.deleteConfirmationPositive}
              onClick={deleteItem}
            >
              {t("draggable_delete-positive")}
            </button>
            <button
              type="button"
              className={styles.deleteConfirmationNegative}
              onClick={denyDeletion}
            >
              {t("draggable_delete-negative")}
            </button>
          </div>
        </Dialog>
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
