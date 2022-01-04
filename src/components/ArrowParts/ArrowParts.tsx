import * as React from "react";
import styles from "./ArrowParts.module.scss";

export const ArrowBody: React.FC = (): JSX.Element => {
  return (
    <svg className={styles.body} viewBox="0 0 1 40" preserveAspectRatio="none">
      <rect x="0" y="28%" width="100%" height="45%" />
    </svg>
  );
};

export const ArrowBodyVertical: React.FC = (): JSX.Element => {
  return (
    <svg
      className={styles.bodyVertical}
      viewBox="0 0 1 40"
      preserveAspectRatio="none"
    >
      <rect x="28%" y="0" width="45%" height="100%" />
    </svg>
  );
};

export const ArrowHead: React.FC = (): JSX.Element => {
  return (
    <svg
      className={styles.head}
      viewBox="0 0 20 40"
      preserveAspectRatio="xMaxYMid"
    >
      <polygon points="0,0 0,40 20,20" />
    </svg>
  );
};

export const ArrowHeadVertical: React.FC = (): JSX.Element => {
  return (
    <svg
      className={styles.headVertical}
      viewBox="0 0 40 20"
      preserveAspectRatio="xMaxYMid"
    >
      <polygon points="20,20 40,0 0,0" />
    </svg>
  );
};

export const MirroredArrowHead: React.FC = (): JSX.Element => {
  return (
    <svg
      className={`${styles.head} ${styles.mirrorX}`}
      viewBox="0 0 20 40"
      preserveAspectRatio="xMaxYMid"
    >
      <polygon points="0,0 0,40 20,20" />
    </svg>
  );
};

export const MirroredArrowHeadVertical: React.FC = (): JSX.Element => {
  return (
    <svg
      className={`${styles.headVertical} ${styles.mirrorY}`}
      viewBox="0 0 40 20"
      preserveAspectRatio="xMaxYMid"
    >
      <polygon points="20,20 40,0 0,0" />
    </svg>
  );
};
