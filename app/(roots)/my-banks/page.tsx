
import Bankcard from '@/components/Bankcard'
import HeaderBox from '@/components/HeaderBox'
import { Button } from '@/components/ui/button'
import { ToastProvider } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const MyBanks = async () => {

  const loggedIn = await getLoggedInUser()
  const accounts = await getAccounts({ userId: loggedIn.$id })
  return (

    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title='My Bank Accounts'
          subtext='Manage Your Banks Here'
          key='my_bank_account'
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your Cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {
              accounts && accounts.data.map((a: Account) => (
                <Bankcard
                  account={a}
                  key={a.id}
                  userName={loggedIn?.firstName}
                  showBalance={true}
                />
              ))
            }
          </div>
        </div>
      </div>
    </section>

  )
}

export default MyBanks