import * as React from "react";
import { MapColor } from "./icons/MapColor";
import { CreateBox } from "./icons/CreateBox";
import { CreateArrow } from "./icons/CreateArrow";

export type IconsProps = {
  icon: string;
  className: string;
};

export const Icons: React.FC<IconsProps> = ({ icon, className }) => {
  if (icon === "h5p-mapcolor") {
    return <MapColor className={className} />;
  }
  if (icon === "h5p-createbox") {
    return <CreateBox className={className} />;
  }
  if (icon === "h5p-createarrow") {
    return <CreateArrow className={className} />;
  }

  /* Else return default icon */
  return <MapColor className={className} />;
};
