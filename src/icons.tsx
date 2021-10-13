import * as React from "react";
import { MapColor } from "./icons/MapColor";
import { CreateBox } from "./icons/CreateBox";
import { CreateArrow } from "./icons/CreateArrow";
import { Edit } from "./icons/Edit";
import { Delete } from "./icons/Delete";
import { BiDirectionalArrow } from "./icons/BiDirectionalArrow";
import { SingleLine } from "./icons/SingleLine";
import { ToolbarButtonType } from "./components/Toolbar/Toolbar";
import { ContextMenuButtonType } from "./components/ContextMenu/ContextMenu";

export type IconProps = {
  icon: ToolbarButtonType | ContextMenuButtonType;
  className: string;
};

export const Icon: React.FC<IconProps> = ({ icon, className }) => {
  const icons = {
    [ToolbarButtonType.MapColor]: MapColor,
    [ToolbarButtonType.CreateBox]: CreateBox,
    [ToolbarButtonType.CreateArrow]: CreateArrow,
    [ContextMenuButtonType.Edit]: Edit,
    [ContextMenuButtonType.Delete]: Delete,
    [ContextMenuButtonType.ArrowDirectional]: CreateArrow,
    [ContextMenuButtonType.ArrowBiDirectional]: BiDirectionalArrow,
    [ContextMenuButtonType.ArrowNonDirectional]: SingleLine,
  };

  const defaultIcon = MapColor;
  const CurrentIcon = icons[icon] ?? defaultIcon;

  return <CurrentIcon className={className} />;
};
