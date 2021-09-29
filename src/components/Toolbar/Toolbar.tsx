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
export enum ToolbarButtons {
  MapColor = "mapColor",
  CreateBox = "createBox",
  CreateArrow = "createArrow",
}

export type ToolBarProps = {
  setActiveTool: (activeTool: ToolbarButtons | null) => void;
};

export const Toolbar: React.FC<ToolBarProps> = ({ setActiveTool }) => {
  const [activeButton, setActiveButton] = React.useState<string | null>();

  const setActive = (newValue: ToolbarButtons): void => {
    setActiveButton(activeButton !== newValue ? newValue : null);
    setActiveTool(activeButton !== newValue ? newValue : null);
  };

  return (
    <div className={styles.toolbar}>
      <ToolbarButton
        icon={ToolbarButtons.MapColor}
        label={labelTexts.mapColor}
        onClick={() => setActive(ToolbarButtons.MapColor)}
        active={activeButton === ToolbarButtons.MapColor}
        showActive={false}
      />
      <ToolbarButton
        icon={ToolbarButtons.CreateBox}
        label={labelTexts.createBox}
        onClick={() => setActive(ToolbarButtons.CreateBox)}
        active={activeButton === ToolbarButtons.CreateBox}
        showActive
      />
      <ToolbarButton
        icon={ToolbarButtons.CreateArrow}
        label={labelTexts.createArrow}
        onClick={() => setActive(ToolbarButtons.CreateArrow)}
        active={activeButton === ToolbarButtons.CreateArrow}
        showActive
      />
    </div>
  );
};
