import ReactDOM from "react-dom";
import "./styles/AlertDialog.css"; // Make sure to create a corresponding CSS file
import { CgClose } from "react-icons/cg";
import Button from "./Button";
import { useEffect, useRef } from "react";

type DialogComponentProps = {
   isOpen: boolean;
   title: string;
   message: string;
   onClose: () => void;
   onContinue: () => void;
};

function AlertDialog({
   isOpen,
   title,
   message,
   onClose,
   onContinue,
}: DialogComponentProps) {
   const overlayContainerRef = useRef<HTMLDivElement | null>(null);
   const continueButtonRef: React.LegacyRef<HTMLButtonElement> | undefined = useRef(null);
   const cancelButtonRef: React.LegacyRef<HTMLButtonElement> | undefined = useRef(null);

   useEffect(() => {
      const handleOnOutsideClick = (e: MouseEvent) => {
         if (e.target === overlayContainerRef.current) {
            onClose();
         }
      };
      document.addEventListener("click", handleOnOutsideClick);

      const handleOnKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape") {
            onClose();
         } else if (e.key === "Enter" && e.target === continueButtonRef.current) {
            onContinue();
         } else if (e.key === "Enter" && e.target === cancelButtonRef.current) {
            onClose();
         }
      };
      document.addEventListener("keydown", handleOnKeyDown);

      return () => {
         document.removeEventListener("click", handleOnOutsideClick);
         document.removeEventListener("keydown", handleOnKeyDown);
      };
   }, [onClose, onContinue]);

   if (!isOpen) return null;

   return ReactDOM.createPortal(
      <div
         className={`alert-dialog-overlay tracking-wide text-neutral-200 opacity-0 transition-opacity ${
            isOpen && "opacity-100"
         }`}
         ref={overlayContainerRef}>
         <div className="alert-dialog bg-neutral-950">
            <div className="alert-dialog-header">
               <h4>{title}</h4>
               <button onClick={onClose}>
                  <CgClose className="size-7" />
               </button>
            </div>
            <div className="alert-dialog-body">
               <p>{message}</p>
            </div>
            <div className="alert-dialog-footer">
               <Button ref={cancelButtonRef} onClick={onClose} variant="outlined">
                  Cancel
               </Button>
               <Button
                  ref={continueButtonRef}
                  onClick={onContinue}
                  variant="filled"
                  color="error"
                  autoFocus>
                  Continue
               </Button>
            </div>
         </div>
      </div>,
      document.body
   );
}

export default AlertDialog;
