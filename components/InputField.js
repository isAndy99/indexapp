import { Input } from "./Input";
import { Label } from "./Label";

export const InputField = ({ id, label, className, ...props }) => (
  <div className={className}>
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} {...props} />
  </div>
);
