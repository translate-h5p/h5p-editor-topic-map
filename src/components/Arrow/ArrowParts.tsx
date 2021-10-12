import * as React from "react";
import styles from "./ArrowParts.module.scss";

interface ArrowPartProps {
  arrowColor: string;
}

export const ArrowBody: React.FC<ArrowPartProps> = ({
  arrowColor,
}): JSX.Element => {
  return (
    <svg className={styles.body} viewBox="0 0 1 40" preserveAspectRatio="none">
      <rect x="0" y="15" width="1" height="10" fill={arrowColor} />
    </svg>
  );
};

export const ArrowHead: React.FC<ArrowPartProps> = ({
  arrowColor,
}): JSX.Element => {
  return (
    <svg
      className={styles.head}
      viewBox="0 0 20 40"
      preserveAspectRatio="xMaxYMid"
    >
      <polygon points="0,0 0,40 20,20" fill={arrowColor} />
    </svg>
  );
};

export const MirroredArrowHead: React.FC<ArrowPartProps> = ({
  arrowColor,
}): JSX.Element => {
  return (
    <svg
      className={`${styles.head} ${styles.mirrorX}`}
      viewBox="0 0 20 40"
      preserveAspectRatio="xMaxYMid"
    >
      <polygon points="0,0 0,40 20,20" fill={arrowColor} />
    </svg>
  );
};
