import * as React from "react";
import { MapColor } from "./icons/MapColor";
import { CreateBox } from "./icons/CreateBox";
import { CreateArrow } from "./icons/CreateArrow";

export type IconsProps = {
  icon: string;
  className: string;
};

export const Icons: React.FC<IconsProps> = ({ icon, className }) => {
  if (icon === "mapcolor") {
    return <MapColor className={className} />;
  }
  if (icon === "createbox") {
    return <CreateBox className={className} />;
  }
  if (icon === "createarrow") {
    return <CreateArrow className={className} />;
  }

  /* Else return default icon */
  return <MapColor className={className} />;
};
