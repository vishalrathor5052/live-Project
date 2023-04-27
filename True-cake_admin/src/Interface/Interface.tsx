export type Maybe<T> = T | undefined | null;

export interface ButtonProps {
  label: string;
  variant: Maybe<any>;
  disable?: boolean | undefined;
  // color?: Maybe<any> | undefined;
  size?: Maybe<any> | undefined;
  StartIcon?: Maybe<any> | undefined;
  sx?: Record<string, unknown>;
  onClick?: () => void | unknown;
}
export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  customStyles?: string;
  getValue?: any;
  error?: string | any;
  onHandleChange?: (e: React.FormEvent<HTMLInputElement>) => void | undefined;
  value?: string | number;
  id?: string;
  name?: string;
  labelClass?: string;
  disabled?: boolean;
  customWidth?: any;
  onBlur?: any;
}
export interface headingProps {
  title: string;
}
export interface tableProps {}

export interface analyiticprops {
  title?: string;
  label?: string;
}

export interface analyiticYellowprops {
  title?: string;
  label?: string;
}
