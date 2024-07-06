'use client'

import React from 'react'
import CounterAnimator from 'react-countup'
const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (
        <div className='w-full'>
            <CounterAnimator
                delay={0.3}
                duration={3}
                decimal='1'
                prefix='$'
                end={amount}
            />
        </div>
    )
}

export default AnimatedCounter