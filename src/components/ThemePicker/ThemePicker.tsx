import * as React from "react";
import { t } from "../../h5p/H5P.util";
import { ColorTheme } from "../../types/ColorTheme";
import { themes } from "../../utils/theme.utils";
import styles from "./ThemePicker.module.scss";

export type ThemePickerProps = {
  activeTheme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
};

export const ThemePicker: React.FC<ThemePickerProps> = ({
  setTheme,
  activeTheme,
}) => {
  const renderColorCircles = React.useCallback(
    () =>
      Array.from({ length: 4 }).map((_, index) => (
        <span
          className={styles.colorCircle}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{ backgroundColor: `var(--theme-color-${index + 1})` }}
        />
      )),
    [],
  );

  const colorThemes = React.useMemo(
    () =>
      themes.map(({ label, value }) => (
        <button
          type="button"
          key={value}
          className={`theme-${value} ${styles.button}${
            value === activeTheme ? ` ${styles.buttonActive}` : ""
          }`}
          onClick={() => setTheme(value)}
        >
          {label}
          <div className={styles.colorCircles}>{renderColorCircles()}</div>
        </button>
      )),
    [activeTheme, renderColorCircles, setTheme],
  );

  const themePickerLabel = t("theme-picker_label");

  return (
    <>
      <div className="h5peditor-label">{themePickerLabel}</div>
      <div className={styles.buttons}>{colorThemes}</div>
    </>
  );
};
