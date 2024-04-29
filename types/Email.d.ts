import { InputHTMLAttributes, Ref } from "react";
type EmailProps = {
    name?: string;
    domains?: string[];
    alwaysVisible?: boolean;
    minChars?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    maxSuggestions?: number;
    onChange?: (value: string) => void;
    inputRef?: Ref<HTMLInputElement>;
    emailClassName?: string;
    emailInputClassName?: string;
    dropdownUlClassName?: string;
    dropdownLiClassName?: string;
    dropdownSpanClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;
export declare const Email: ({ name, domains, alwaysVisible, minChars, maxSuggestions, onChange, inputRef, emailClassName, emailInputClassName, dropdownUlClassName, dropdownLiClassName, dropdownSpanClassName, ...inputAttributes }: EmailProps) => import("react/jsx-runtime").JSX.Element;
export {};
