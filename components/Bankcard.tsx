import { formatAmount } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Bankcard = ({ account, userName, showBalance }: CreditCardProps) => {
    return (
        <div className="flex flex-col">
            <Link href='/' className='bank-card'>
                <div className="bank-card_content">
                    <div className="">
                        <h1 className="text-16 font-semibold text-white">{account.name || userName}</h1>
                        <p className="font-ibm-plex-serif font-black">
                            {formatAmount(account.currentBalance)}
                        </p>
                    </div>
                    <article className='flex flex-col gap-2'>
                        <div className="flex justify-between">
                            <h1 className="text-12 font-semibold text-white">
                                {userName}</h1>
                            <h2 className="text-12 font-semibold text-white">
                            ●●/●●</h2>
                        </div>
                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                        ●●●● ●●●● ●●●● <span className='text-16'>
                                {account.mask || 1234}
                            </span>
                        </p>
                    </article>
                </div>
                <div className="bank-card_icon">
                    <Image
                    src={'/icons/Paypass.svg'}
                    height={20}
                    width={20}
                    alt='Paypass'
                    />
                    <Image
                    src={'/icons/mastercard.svg'}
                    width={45}
                    height={32}
                    alt='mastercard Logo'
                    // className='ml-5'
                    />
                </div>
                <Image
                src={'/icons/lines.png'}
                width={316}
                height={190}
                alt='lines'
                className='absolute top-0 left-0'
                />
            </Link>
        </div>
    )
}

export default Bankcard