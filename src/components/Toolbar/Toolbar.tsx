import * as React from "react";
import styles from "./Toolbar.module.scss";
import { Icons } from "../../icons";

export const Toolbar: React.FC = () => {
  const [activeButton, setActiveButton] = React.useState<string | null>();

  const libraryList = [
    {
      name: "H5P.MapColor",
      title: "Map color",
      setActive: false,
    },
    {
      name: "H5P.CreateBox",
      title: "Create box",
      setActive: true,
    },
    {
      name: "H5P.CreateArrow",
      title: "Create arrow",
      setActive: true,
    },
  ];
  return (
    <div className={styles.toolbar}>
      {libraryList.map(library => {
        const isActiveButton = library.name === activeButton;
        const newActiveButton = library.setActive && !isActiveButton;
        const iconName = library.name.toLowerCase().replace(".", "-");

        return (
          <button
            type="button"
            key={library.name}
            className={
              isActiveButton
                ? `${styles.toolbarButton} ${styles.active}`
                : styles.toolbarButton
            }
            onClick={() =>
              setActiveButton(newActiveButton ? library.name : null)
            }
            aria-label={library.title}
          >
            <Icons icon={iconName} className={styles.icon} />
            <div className={styles.tooltip}>{library.title}</div>
          </button>
        );
      })}
    </div>
  );
};
