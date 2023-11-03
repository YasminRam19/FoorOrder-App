import { useEffect, useReducer, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, className }) => {
  //To interact with native dialogue element whenever the open prop value changes
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      //Open the dialog programmatically
      dialog.current.showModal();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
