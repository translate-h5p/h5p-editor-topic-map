import * as React from "react";
import styles from "./Toolbar.module.scss";
import { ToolbarButton } from "../ToolbarButton/ToolbarButton";

/* TODO: Translate */
const labelTexts = {
  mapcolor: "Map color",
  createbox: "Create box",
  createarrow: "Create arrow",
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
        label={labelTexts.mapcolor}
        onClick={setActive}
        showActive={false}
        activeButton={activeButton}
      />
      <ToolbarButton
        label={labelTexts.createbox}
        onClick={setActive}
        showActive
        activeButton={activeButton}
      />
      <ToolbarButton
        label={labelTexts.createarrow}
        onClick={setActive}
        showActive
        activeButton={activeButton}
      />
    </div>
  );
};
