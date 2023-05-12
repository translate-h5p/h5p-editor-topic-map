import * as React from 'react';
import { MapAppearance } from '../../icons/MapAppearance';
import { CreateBox } from '../../icons/CreateBox';
import { CreateArrow } from '../../icons/CreateArrow';
import { Edit } from '../../icons/Edit';
import { Delete } from '../../icons/Delete';
import { BiDirectionalArrow } from '../../icons/BiDirectionalArrow';
import { SingleLine } from '../../icons/SingleLine';
import { ToolbarButtonType } from '../Toolbar/Toolbar';
import { ContextMenuButtonType } from '../ContextMenu/ContextMenu';

export type IconProps = {
  icon: ToolbarButtonType | ContextMenuButtonType;
  className: string;
};

export const Icon: React.FC<IconProps> = ({ icon, className }) => {
  const icons = {
    [ToolbarButtonType.MapAppearance]: MapAppearance,
    [ToolbarButtonType.CreateBox]: CreateBox,
    [ToolbarButtonType.CreateArrow]: CreateArrow,
    [ContextMenuButtonType.Edit]: Edit,
    [ContextMenuButtonType.Delete]: Delete,
    [ContextMenuButtonType.ArrowDirectional]: CreateArrow,
    [ContextMenuButtonType.ArrowBiDirectional]: BiDirectionalArrow,
    [ContextMenuButtonType.ArrowNonDirectional]: SingleLine,
  };

  const defaultIcon = MapAppearance;
  const CurrentIcon = icons[icon] ?? defaultIcon;

  return <CurrentIcon className={className} />;
};
