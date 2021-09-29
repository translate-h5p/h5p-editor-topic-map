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
};

export const Toolbar: React.FC<ToolBarProps> = ({ setActiveTool }) => {
  const [activeButton, setActiveButton] = React.useState<string | null>();

  const setActive = (newValue: ToolbarButtonType): void => {
    setActiveButton(activeButton !== newValue ? newValue : null);
    setActiveTool(activeButton !== newValue ? newValue : null);
  };

  return (
    <div className={styles.toolbar}>
      <ToolbarButton
        icon={ToolbarButtonType.MapColor}
        label={labelTexts.mapColor}
        onClick={() => setActive(ToolbarButtonType.MapColor)}
        active={activeButton === ToolbarButtonType.MapColor}
        showActive={false}
      />
      <ToolbarButton
        icon={ToolbarButtonType.CreateBox}
        label={labelTexts.createBox}
        onClick={() => setActive(ToolbarButtonType.CreateBox)}
        active={activeButton === ToolbarButtonType.CreateBox}
        showActive
      />
      <ToolbarButton
        icon={ToolbarButtonType.CreateArrow}
        label={labelTexts.createArrow}
        onClick={() => setActive(ToolbarButtonType.CreateArrow)}
        active={activeButton === ToolbarButtonType.CreateArrow}
        showActive
      />
    </div>
  );
};
