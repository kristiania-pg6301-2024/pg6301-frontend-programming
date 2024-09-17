import React, { MutableRefObject, ReactNode, useEffect, useRef } from "react";

interface Props {
  visible: boolean;
  onClose(): void;
  children: ReactNode;
}

export function Dialog({ visible, onClose, children }: Props) {
  const dialogRef = useRef() as MutableRefObject<HTMLDialogElement>;

  useEffect(() => {
    if (visible) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [visible]);
  useEffect(() => {
    dialogRef.current.addEventListener("close", onClose);
  }, [dialogRef]);

  return <dialog ref={dialogRef}>{children}</dialog>;
}
