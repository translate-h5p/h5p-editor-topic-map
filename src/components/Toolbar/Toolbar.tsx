import * as React from "react";
import { t } from "../../h5p/H5P.util";
import { ToolbarButton } from "../ToolbarButton/ToolbarButton";
import styles from "./Toolbar.module.scss";

const labelTexts = {
  mapColor: t("toolbar-button-type_map-color"),
  createBox: t("toolbar-button-type_create-box"),
  createArrow: t("toolbar-button-type_create-arrow"),
  cannotCreateArrow: t("toolbar-button-type_cannot-create-arrow"),
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
};

export const Toolbar: React.FC<ToolBarProps> = ({
  setActiveTool,
  activeTool,
  isArrowButtonDisabled,
}) => {
  const [activeButton, setActiveButton] = React.useState<string | null>(
    activeTool,
  );

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
        label={labelTexts.mapColor}
        onClick={() => setActive(ToolbarButtonType.MapColor)}
        active={checkIfActive(ToolbarButtonType.MapColor)}
        showActive={false}
        isDisabled={false}
      />
      <ToolbarButton
        icon={ToolbarButtonType.CreateBox}
        label={labelTexts.createBox}
        onClick={() => setActive(ToolbarButtonType.CreateBox)}
        active={checkIfActive(ToolbarButtonType.CreateBox)}
        showActive
        isDisabled={false}
      />
      <ToolbarButton
        icon={ToolbarButtonType.CreateArrow}
        label={
          isArrowButtonDisabled
            ? labelTexts.cannotCreateArrow
            : labelTexts.createArrow
        }
        onClick={() => setActive(ToolbarButtonType.CreateArrow)}
        active={checkIfActive(ToolbarButtonType.CreateArrow)}
        showActive
        isDisabled={isArrowButtonDisabled}
      />
    </div>
  );
};
