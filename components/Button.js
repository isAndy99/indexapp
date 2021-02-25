import cn from "classnames";
import styles from "./Button.module.scss";

export const Button = ({ children, className, ...props }) => (
  <button {...props} className={cn(styles.button, className)}>
    {children}
  </button>
);
