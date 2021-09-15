import * as React from "react";
import styles from "./Toolbar.module.scss";

export type ToolbarProps = {
  initialHeight: number;
  initialWidth: number;
};

export const Toolbar: React.FC<ToolbarProps> = ({
  initialHeight,
  initialWidth,
}) => {
  const [activeKey, setActiveKey] = React.useState<string | null>();

  const libraryList = [
    {
      name: "ThemeColor",
      title: "Theme color",
      content: "A",
      allowActive: false
    },
    {
      name: "AddBox",
      title: "Add box",
      content: "B",
      allowActive: true
    },
    {
      name: "AddArrow",
      title: "Add arrow",
      content: "C",
      allowActive: true
    }
  ];
  return (
    <div className={styles.toolbar}>
      {
        libraryList.map(library => {
          const changeActive = library.allowActive && library.name != activeKey;
          const className = activeKey === library.name ? styles.toolbarItemActive : styles.toolbarItem;
          const iconClassName = library.name
            .toLowerCase()
            .replace('.', '-');
                    
          return (
            <button
              type="button"
              key={library.name}
              className={className + " " + iconClassName}
              onClick={() => setActiveKey(changeActive ? library.name : null)}
            >
              {library.content}
              <div className={styles.tooltip}>
                {library.title}
              </div>
            </button>
          ); 
        })
      }
    </div>
  );
};