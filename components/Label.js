import styles from "./Label.module.scss";
import cn from "classnames";

export const Label = ({ children, className, ...props }) => (
  <label className={cn(styles.label, className)} {...props}>
    {children}
  </label>
);
