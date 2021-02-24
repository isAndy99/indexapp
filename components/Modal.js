import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

export const Modal = ({ children, isOpen }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = isOpen ? (
    <div className={styles.modalOverlay}>
      <div className="modal">{children}</div>
    </div>
  ) : null;

  return isBrowser
    ? createPortal(modalContent, document.getElementById("modal-root"))
    : null;
};
