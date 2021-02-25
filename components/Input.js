import styles from "./Input.module.scss";
import cn from "classnames";

export const Input = ({ className, ...props }) => (
  <input className={cn(styles.input, className)} {...props} />
);
