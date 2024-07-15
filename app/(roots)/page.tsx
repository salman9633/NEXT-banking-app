import HeaderBox from '@/components/HeaderBox'
import RightsideBar from '@/components/RightsideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const RootsTest = () => {
  const loggedIn = {
    firstName: "Salman",
    lastName: "Faris",
    email: 'salmanvaipees913@gmail.com'
  }

  return (
    <section className='home'>
      <div className="home-content">
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
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