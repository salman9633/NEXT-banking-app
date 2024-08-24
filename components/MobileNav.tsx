'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Footer from "./Footer"
import PlaidLink from "./PlaidLink"


const MobileNav = ({ user }: MobileNavProps) => {
    const pathName = usePathname()
    return (
        <section className="w-full max-w-[264px">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src='/icons/hamburger.svg'
                        height={30}
                        width={30}
                        alt="Hamburger Menu"
                    />
                </SheetTrigger>
                <SheetContent side="left" className="border-blue-50 bg-white">
                    <div className="mobilenav-sheet">
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                                <Link
                                    href="/"
                                    className='mb-9 cursor-pointer flex items-center gap-2 px-4'>
                                    <Image
                                        src="/icons/logo.svg"
                                        width={34}
                                        height={34}
                                        alt="logo"
                                    // className="size-[24px] max-xl:size-14"
                                    />
                                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Banking App</h1>
                                </Link>
                                {sidebarLinks.map(item => {
                                    const isActive = item.route === pathName || pathName.startsWith(`${item.route}/`)
                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link
                                                href={item.route}
                                                key={item.label}
                                                className={cn(
                                                    'mobilenav-sheet_close w-full',
                                                    {
                                                        'bg-bank-gradient': isActive,
                                                        'hover:scale-105 duration-200': !isActive

                                                    }
                                                )}
                                            >

                                                <Image
                                                    src={item.imgURL}
                                                    width={24}
                                                    height={24}
                                                    alt={item.label}

                                                    className={
                                                        cn({
                                                            'brightness-[3] invert-0': isActive
                                                        })
                                                    }
                                                />

                                                <p className={cn('text-16 font-semibold text-black-2', {
                                                    'text-white': isActive
                                                })}>{item.label}</p>
                                            </Link>

                                        </SheetClose>
                                    )
                                })}

                                <PlaidLink user={user} />
                            </nav>
                        </SheetClose>
                        <Footer user={user} type="mobile" />
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav