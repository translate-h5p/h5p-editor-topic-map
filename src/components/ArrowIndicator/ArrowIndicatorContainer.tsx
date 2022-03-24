/* eslint-disable no-nested-ternary */
import * as React from "react";
import styles from "./ArrowIndicator.module.scss";

export type ArrowIndicatorProps = {
  arrowIndicators: JSX.Element[];
};

// TODO: Share code with h5p-topic-map instead of duplicating
export const ArrowIndicatorContainer: React.FC<ArrowIndicatorProps> = ({
  arrowIndicators,
}) => {
  return <svg className={styles.arrowSvg}>{arrowIndicators}</svg>;
};
