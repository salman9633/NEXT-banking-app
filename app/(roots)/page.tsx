import HeaderBox from '@/components/HeaderBox'
import RightsideBar from '@/components/RightsideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const RootsTest = async () => {
  const loggedIn = await getLoggedInUser()

  return (
    <section className='home'>
      <div className="home-content">
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext='This is where you can manage your accounts'
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={5}
            totalCurrentBalance={2999.99}
          />
        </header>
      </div>
      <RightsideBar
        user={loggedIn}
        transactions={[]}
        banks={[{
          currentBalance: 123
        }, { currentBalance: 299 }]}
      />

    </section>
  )
}

export default RootsTest