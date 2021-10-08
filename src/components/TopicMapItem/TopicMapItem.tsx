import * as React from "react";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import styles from "./TopicMapItem.module.scss";

type TopicMapItemTypeWithoutPositions = Omit<
  TopicMapItemType,
  | "xPercentagePosition"
  | "yPercentagePosition"
  | "widthPercentage"
  | "heightPercentage"
>;

export type TopicMapItemProps = {
  item: TopicMapItemTypeWithoutPositions;
};

export const TopicMapItem: React.FC<TopicMapItemProps> = ({ item }) => {
  return (
    <div className={styles.topicMapItem}>
      {item.backgroundImage?.path && (
        <img
          className={styles.image}
          src={item.backgroundImage.path}
          alt={item.backgroundImage.path}
        />
      )}

      <div className={styles.inner}>
        <div className={styles.label}>{item.label}</div>
        {item.description && (
          <div className={styles.description}>{item.description}</div>
        )}
      </div>
    </div>
  );
};
