import * as React from "react";

export type IconsProps = {
  icon: string;
  className: string;
};

export const Icons: React.FC<IconsProps> = ({
  icon,
  className,
}) => {
  if (icon === "h5p-mapcolor") {
    return (
      <MapColor className={className}/>
    );
  }
  if (icon === "h5p-addbox") {
    return (
      <AddBox className={className}/>
    );
  }
  if (icon === "h5p-addarrow") {
    return (
      <AddArrow className={className}/>
    );
  }

  /* Else return default icon */
  return (
    <MapColor className={className}/>
  );
};

/**
 * Listing all svg icons
 */
export type IconProps = {
  className: string;
};

export const MapColor: React.FC<IconProps> = ({
  className,
}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" fill="#000000">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  );
};

export const AddBox: React.FC<IconProps> = ({
  className,
}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" fill="#000000">
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"/>
    </svg>
  );
};

export const AddArrow: React.FC<IconProps> = ({
  className,
}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" fill="#000000">
      <rect fill="none" height="24" width="24"/>
      <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z"/>
    </svg>
  );
};