import * as React from "react";
import {
  Root,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./Dialog.module.scss";
import { t } from "../../h5p/H5P.util";

export type DialogProps = {
  open: boolean;
  title: string;
  description?: string | undefined;
  onOpenChange: (open: boolean) => void;
};

export const Dialog: React.FC<DialogProps> = ({
  open,
  title,
  description,
  onOpenChange,
  children,
}) => {
  const closeButtonLabel = t("dialog_close");

  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Overlay className={styles.overlay} />
      <Content className={styles.content}>
        <Title className={styles.title}>{title}</Title>
        {description && <Description>{description}</Description>}
        <Close className={styles.closeButton} aria-label={closeButtonLabel}>
          <Cross2Icon />
        </Close>
        {children}
      </Content>
    </Root>
  );
};
