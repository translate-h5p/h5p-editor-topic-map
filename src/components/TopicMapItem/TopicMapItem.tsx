import * as React from "react";
import { getImageUrl } from "../../h5p/H5P.util";
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
  const imageUrl = getImageUrl(item.backgroundImage?.path);

  return (
    <div className={styles.topicMapItem}>
      {item.backgroundImage && imageUrl && (
        <img
          className={styles.image}
          src={imageUrl}
          alt={item.backgroundImage.alt ?? ""}
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
