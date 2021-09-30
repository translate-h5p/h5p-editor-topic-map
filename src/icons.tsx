import * as React from "react";
import { MapColor } from "./icons/MapColor";
import { CreateBox } from "./icons/CreateBox";
import { CreateArrow } from "./icons/CreateArrow";
import { ToolbarButtonType } from "./components/Toolbar/Toolbar";

export type IconsProps = {
  icon: string;
  className: string;
};

export const Icons: React.FC<IconsProps> = ({ icon, className }) => {
  if (icon === ToolbarButtonType.MapColor) {
    return <MapColor className={className} />;
  }
  if (icon === ToolbarButtonType.CreateBox) {
    return <CreateBox className={className} />;
  }
  if (icon === ToolbarButtonType.CreateArrow) {
    return <CreateArrow className={className} />;
  }

  /* Else return default icon */
  return <MapColor className={className} />;
};
