import * as React from "react";
import { t } from "../../h5p/H5P.util";
import { H5PFieldImage } from "../../types/h5p/H5PField";
import { H5PForm } from "../../types/h5p/H5PForm";
import { Params } from "../../types/h5p/Params";
import { TranslationKey } from "../../types/TranslationKey";
import { AppearanceDialog } from "../AppearanceDialog/AppearanceDialog";
import { ToolbarButton } from "../ToolbarButton/ToolbarButton";
import styles from "./Toolbar.module.scss";

const labelTextKeys: Record<string, TranslationKey> = {
  mapColor: "toolbar-button-type_map-color",
  createBox: "toolbar-button-type_create-box",
  createArrow: "toolbar-button-type_create-arrow",
  cannotCreateArrow: "toolbar-button-type_cannot-create-arrow",
};

/*
  Name of svg icon should be similar to this,
  specify the svg icon in icons.tsx
*/
export enum ToolbarButtonType {
  MapColor = "mapColor",
  CreateBox = "createBox",
  CreateArrow = "createArrow",
}

export type ToolBarProps = {
  setActiveTool: (activeTool: ToolbarButtonType | null) => void;
  activeTool: ToolbarButtonType | null;
  isArrowButtonDisabled: boolean;
  setParams: (params: Params) => void;
  backgroundImageField: H5PFieldImage;
  params: Params;
  parent: H5PForm;
};

export const Toolbar: React.FC<ToolBarProps> = ({
  setActiveTool,
  activeTool,
  isArrowButtonDisabled,
  setParams,
  backgroundImageField,
  params,
  parent,
}) => {
  const [activeButton, setActiveButton] = React.useState(activeTool);
  const [appearanceDialogOpen, setAppearanceDialogOpen] = React.useState(false);

  const setActive = (newValue: ToolbarButtonType): void => {
    setActiveButton(activeButton !== newValue ? newValue : null);
    setActiveTool(activeButton !== newValue ? newValue : null);
  };

  const checkIfActive = React.useCallback(
    (type: ToolbarButtonType) => {
      const activeB = activeButton === type;
      const activeT = activeTool === type;

      if (activeB && activeT) {
        return true;
      }
      if (activeB && !activeT) {
        setActiveButton(activeTool);
        return true;
      }
      return false;
    },
    [activeButton, activeTool],
  );

  return (
    <div className={styles.toolbar}>
      <ToolbarButton
        icon={ToolbarButtonType.MapColor}
        label={t(labelTextKeys.mapColor)}
        onClick={() => setAppearanceDialogOpen(wasOpen => !wasOpen)}
        active={false}
        showActive={false}
        isDisabled={false}
      />
      <ToolbarButton
        icon={ToolbarButtonType.CreateBox}
        label={t(labelTextKeys.createBox)}
        onClick={() => setActive(ToolbarButtonType.CreateBox)}
        active={checkIfActive(ToolbarButtonType.CreateBox)}
        showActive
        isDisabled={false}
      />
      <ToolbarButton
        icon={ToolbarButtonType.CreateArrow}
        label={
          isArrowButtonDisabled
            ? t(labelTextKeys.cannotCreateArrow)
            : t(labelTextKeys.createArrow)
        }
        onClick={() => setActive(ToolbarButtonType.CreateArrow)}
        active={checkIfActive(ToolbarButtonType.CreateArrow)}
        showActive
        isDisabled={isArrowButtonDisabled}
      />

      <AppearanceDialog
        isOpen={appearanceDialogOpen}
        setIsOpen={setAppearanceDialogOpen}
        onSave={setParams}
        backgroundImageField={backgroundImageField}
        params={params}
        parent={parent}
      />
    </div>
  );
};
