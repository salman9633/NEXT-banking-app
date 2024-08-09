import React from 'react'

import { FieldPath, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Control } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { AuthFormSchema } from '@/lib/utils'


const formSchema = AuthFormSchema('sign-up')

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,


}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
    return (

        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div>
                    <FormLabel>{label}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className='input-class'
                                type={name === 'password' ? 'password' : 'text'}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className='form-message'></FormMessage>
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput