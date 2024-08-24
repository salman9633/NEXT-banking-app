'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

const Sidebar = ({ user }: SiderbarProps) => {
  const pathName = usePathname()
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className='mb-12 cursor-pointer flex items-center gap-2'>
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo text-2xl">Banking App</h1>
        </Link>
        {sidebarLinks.map(item => {
          const isActive = item.route === pathName || pathName.startsWith(`${item.route}/`)
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'sidebar-link',
                {
                  'bg-bank-gradient': isActive,
                  'hover:scale-105 duration-200': !isActive
                }
              )}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  // width={24}
                  // height={24}
                  alt={item.label}
                  fill
                  className={
                    cn({
                      'brightness-[3] invert-0': isActive
                    })
                  }
                />
              </div>
              <p className={cn('sidebar-label', {
                '!text-white': isActive,
                'hover:scale-90 duration-200': !isActive
              })}>{item.label}</p>
            </Link>
          )
        })}

        <PlaidLink user={user} />
      </nav>
      <Footer user={user} />
    </section>
  )
}

export default Sidebar