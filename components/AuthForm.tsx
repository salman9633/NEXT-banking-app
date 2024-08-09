'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { AuthFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = AuthFormSchema(type)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);
        console.log(values);
        setIsLoading(false);
    }

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
                                    {
                                        type === "sign-up" && (<>
                                            <CustomInput
                                                control={form.control} label={'First Name'} name="firstName" placeholder={'Enter Your First Name'} />
                                            <CustomInput
                                                control={form.control} label={'Last Name'} name="latsName" placeholder={'Enter Your last Name'} />
                                            <CustomInput
                                                control={form.control} label={'Address'} name="address" placeholder={'Enter Your Address'} />
                                            <CustomInput
                                                control={form.control} label={'State'} name="state" placeholder={'EX : Kerala'} />
                                            <CustomInput
                                                control={form.control} label={'Postal Code'} name="postalCode" placeholder={'Ex : 680680'} />
                                            <CustomInput
                                                control={form.control} label={'DOB'} name="dob" placeholder={'YYYY-MM-DD'} />
                                            <CustomInput
                                                control={form.control} label={'SSN'} name="SNN" placeholder={'EX : 0000'} />
                                        </>)
                                    }
                                    <CustomInput
                                        control={form.control} label={'Email'} name="email" placeholder={'Enter Your Email'} />
                                    <CustomInput
                                        control={form.control} label={'Password'} name='password' placeholder={'Enter Your Password'} />
                                    <div className="flex flex-col gap-4">
                                        <Button type="submit" className='form-btn' disabled={isLoading}>
                                            {isLoading ? (<>
                                                <Loader2 speed={1000} size={20} className='animate-spin' /> &nbsp; Loading...
                                            </>) : type === 'sign-in' ? 'Sign In' : "Sign Up"}

                                        </Button>
                                    </div>

                                </form>
                            </Form>
                            <footer className='flex justify-center gap-1'>
                                <p className='text-14 font-normal text-gray-600'>
                                    {
                                        type === 'sign-in' ? "Dont Have An Account?" : "Already Have An Account?"
                                    }
                                </p>
                                <Link className='form-link' href={type === "sign-in" ? 'sign-up' : 'sign-in'}>
                                    {type === "sign-in" ? 'sign-up' : 'sign-in'}
                                </Link>
                            </footer>
                        </>
                    )

            }

        </section>
    )
}

export default AuthForm