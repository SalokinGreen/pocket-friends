import React, { ChangeEvent, KeyboardEvent, Ref } from "react";
import styles from "./UI.module.css";

type InputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  ref: Ref<HTMLInputElement>;
  handleEnter: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  onChange,
  value,
  placeholder,
  ref,
  handleEnter,
}) => {
  return (
    <input
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={styles.input}
      ref={ref}
      onKeyDown={handleEnter}
      autoComplete="off"
    />
  );
};

export default Input;
