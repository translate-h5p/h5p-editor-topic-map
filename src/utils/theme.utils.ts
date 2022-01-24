import { t } from "../h5p/H5P.util";
import { ColorTheme } from "../types/ColorTheme";

export const themes = Object.values(ColorTheme).map(value => ({
  value,
  label: t(`global_theme-${value}`),
}));

export const defaultTheme = ColorTheme.Blue;
