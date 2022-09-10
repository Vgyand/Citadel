import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export interface IFieldProps {
    placeholder: string
    error?: FieldError | undefined
}
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> { }

type TypeInputPropsFIeld = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputPropsFIeld { }