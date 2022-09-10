import Field from "@/components/ui/FormElements/Field"
import { validEmail } from "@/shared/regex"
import { FC } from "react"
import { FormState, UseFormRegister } from "react-hook-form"

interface IAuthFields {
    register: UseFormRegister<any>
    formState: FormState<any>
    isPasswordRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({ register, formState: { errors }, isPasswordRequired }) => {
    return (<>
        <Field {...register('email', {
            required: 'Email is required',
            pattern: {
                value: validEmail,
                message: 'Please enter a valid email address'
            }
        })
        } placeholder='E-mail' />
        <Field {...register('password', isPasswordRequired ? {
            required: 'Password is required',
            minLength: {
                value: 6,
                message: 'Min length should more 6 symbols'
            }
        } : {})} placeholder='Password' type="password" />
    </>

    )
}

export default AuthFields