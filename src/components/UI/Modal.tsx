import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal: React.FC<{
  children?: React.ReactNode;
  open?: boolean;
  className?: string;
  onClose: () => void | null;
}> = ({ children, open, className = "", onClose }) => {
  const dialog = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    const modal = dialog.current;
    if (modal) {
      if (open) {
        modal.showModal?.();
      } else {
        modal.close?.();
      }
    }
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
};
export default Modal;
