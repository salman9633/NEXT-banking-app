import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions'
import RightsideBar from '@/components/RightsideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const RootsTest = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1
  let loggedIn
  try {
    loggedIn = await getLoggedInUser()
  } catch (error) {
    console.error(error, '............');
  }

  if (!loggedIn) {
    loggedIn = {
      firstName: 'Guest'
    }
  }

  const accounts = await getAccounts({ userId: loggedIn.$id })

  if (!accounts) return
  const accountsData = accounts?.data
  const appwriteItemId = (id as string) || accountsData?.[0]?.appwriteItemId
  const account = await getAccount({ appwriteItemId })

  // console.log({ account, accountsData })


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
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <RightsideBar
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      />

    </section>
  )
}

export default RootsTest