import React from "react";

export const Pagination = ({ onPrev, onNext, isFirst, isLast }) => (
  <>
    <button disabled={isFirst} onClick={onPrev}>
      PREV
    </button>
    <button disabled={isLast} onClick={onNext}>
      NEXT
    </button>
  </>
);
