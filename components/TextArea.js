import styles from "./TextArea.module.scss";
import cn from "classnames";

export const TextArea = ({ className, ...props }) => (
  <textarea className={cn(styles.textArea, className)} {...props} />
);
