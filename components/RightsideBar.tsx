import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Bankcard from './Bankcard'

const RightsideBar = ({ user, transactions, banks }: RightSidebarProps) => {
    return (
        <aside className='right-sidebar'>
            <section className="flex flex-col pb-8">
                <div className="profile-banner">
                    <div className="profile flex-col">
                        <div className="profile-img">
                            <span className="text-4xl font-semibold text-blue-600">
                                {
                                    user.firstName[0]
                                }
                                {user.lastName &&
                                    user?.lastName[0]
                                }
                            </span>
                        </div>
                        <div className="profile-details">
                            <h1 className='profile-name'>{user.firstName} {user.lastName}</h1>
                            <p className='profile-email'>{user.email}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="banks">
                <div className="flex w-full justify-between">
                    <h2 className='header-2'>
                        My Banks
                    </h2>
                    <Link href='/' className='flex gap-2 hover:scale-125 duration-300'>
                        <Image
                            src='/icons/plus.svg'
                            width={24}
                            height={24}
                            alt="Plus Icon"
                        />
                    </Link>
                </div>
                {
                    banks?.length > 0 &&
                    (
                        <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                            <div className="relative z-10 hover:scale-105  duration-150">
                                <Bankcard
                                    key={banks[0]?.$id}
                                    account={banks[0]}
                                    userName={`${user.firstName} ${user.lastName}`}
                                    showBalance={false}
                                />
                            </div>
                            {
                                banks[1] && (
                                    <div className="absolute right-0 top-8 z-0 w-[90%] hover:scale-105 hover:relative! hover:z-10 duration-100">
                                        <Bankcard
                                            key={banks[0]?.$id}
                                            account={banks[0]}
                                            userName={`${user.firstName} ${user.lastName}`}
                                            showBalance={false} />
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </section>
        </aside>
    )
}

export default RightsideBar