import * as React from "react";
import styles from "./Toolbar.module.scss";
import { ToolbarButton } from "../ToolbarButton/ToolbarButton";

/* TODO: Translate */
const labelTexts = {
  mapColor: "Map color",
  createBox: "Create box",
  createArrow: "Create arrow",
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
};

export const Toolbar: React.FC<ToolBarProps> = ({
  setActiveTool,
  activeTool,
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
      />
      <ToolbarButton
        icon={ToolbarButtonType.CreateBox}
        label={labelTexts.createBox}
        onClick={() => setActive(ToolbarButtonType.CreateBox)}
        active={checkIfActive(ToolbarButtonType.CreateBox)}
        showActive
      />
      <ToolbarButton
        icon={ToolbarButtonType.CreateArrow}
        label={labelTexts.createArrow}
        onClick={() => setActive(ToolbarButtonType.CreateArrow)}
        active={checkIfActive(ToolbarButtonType.CreateArrow)}
        showActive
      />
    </div>
  );
};