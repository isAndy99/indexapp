import React from "react";
import { Button } from "./Button";
import styles from "./Pagination.module.scss";

export const Pagination = ({ onPrev, onNext, isFirst, isLast }) => (
  <div className={styles.container}>
    <Button disabled={isFirst} onClick={onPrev}>
      PREVIOUS
    </Button>
    <Button disabled={isLast} onClick={onNext}>
      NEXT
    </Button>
  </div>
);
