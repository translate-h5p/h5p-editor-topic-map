import * as React from "react";
import styles from "./Toolbar.module.scss";
import { ToolbarButton } from "../ToolbarButton/ToolbarButton";

/* TODO: Translate */
const labelTexts = {
  mapColor: "Map color",
  createBox: "Create box",
  createArrow: "Create arrow",
};

export const Toolbar: React.FC = () => {
  const [activeButton, setActiveButton] = React.useState<string | null>();

  const setActive = (newValue: string): void => {
    setActiveButton(activeButton !== newValue ? newValue : null);
  };

  /*
    The button label and svg icon should have 
    similar names, so it is easy to find.
  */
  return (
    <div className={styles.toolbar}>
      <ToolbarButton
        label={labelTexts.mapColor}
        onClick={setActive}
        showActive={false}
        activeButton={activeButton}
      />
      <ToolbarButton
        label={labelTexts.createBox}
        onClick={setActive}
        showActive
        activeButton={activeButton}
      />
      <ToolbarButton
        label={labelTexts.createArrow}
        onClick={setActive}
        showActive
        activeButton={activeButton}
      />
    </div>
  );
};
