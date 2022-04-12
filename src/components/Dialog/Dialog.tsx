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
import { t } from "../../H5P/H5P.util";

type DialogSize = "medium" | "large";

export type DialogProps = {
  isOpen: boolean;
  title: string;
  description?: string | undefined;
  onOpenChange: (open: boolean) => void;
  size: DialogSize;
  children: React.ReactElement | null | Array<React.ReactElement | null>;
};

const maxWidths: Record<DialogSize, number> = {
  medium: 450,
  large: 750,
};

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  description,
  onOpenChange,
  children,
  size,
}) => {
  const closeButtonLabel = t("dialog_close");

  const maxWidth = maxWidths[size];

  return (
    <Root open={isOpen} onOpenChange={onOpenChange}>
      <Overlay className={styles.overlay} />
      <Content className={styles.content} style={{ maxWidth }}>
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
