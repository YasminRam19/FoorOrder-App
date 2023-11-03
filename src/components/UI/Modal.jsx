import { useEffect, useReducer, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, className }) => {
  //To interact with native dialogue element whenever the open prop value changes
  const dialog = useRef();

  useEffect(() => {
    //Recommended to lock in the value in this ref when this effects function runs.
    const modal = dialog.current;

    //Open the dialog programmatically
    if (open) {
      modal.showModal();
    }

    //Cleanup function to be able to close the modal
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
