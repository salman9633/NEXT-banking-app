'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { AuthFormSchema } from '@/lib/utils'

const AuthForm = ({ type }: { type: string }) => {

    // 1. Define your form.
    const form = useForm<z.infer<typeof AuthFormSchema>>({
        resolver: zodResolver(AuthFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof AuthFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const [user, setUser] = useState(null)
    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link
                    href="/"
                    className='mb-9 cursor-pointer flex items-center gap-2'>
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="logo"
                    // className="size-[24px] max-xl:size-14"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Banking App</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {
                            user ?
                                'Link Account' :
                                type === 'sign-up' ? 'Sign Up' : 'Sign In'
                        }
                        <p className="text-16 font-normal text-gray-600">{user ? 'Link your Account To Get Start' : 'Please Enter Your Details'}</p>
                    </h1>
                </div>
            </header>
            {
                user ?
                    (<div className="flex flex-col gap-4">
                        {/* link account */}
                    </div>) : (
                        <>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                    <CustomInput
                                        control={form.control} label={'Email'} name="email" placeholder={'Enter Your Email'}  />
                                    <CustomInput
                                        control={form.control} label={'Password'} name='password' placeholder={'Enter Your Password'}  />

                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </>
                    )

            }

        </section>
    )
}

export default AuthForm