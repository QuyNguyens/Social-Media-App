import React from 'react'
import Notifications from './Notifications'
import TrendsSidebar from '@/components/TrendsSidebar'

const page = () => {
  return (
    <main className="flex w-full min-w-0 gap-5">
        <div className="w-full min-w-0 space-y-5">
            <div className="rounded-2xl bg-card p-5 shadow-sm">
                <h1 className="text-center text-2xl font-bold">Notifications</h1>
            </div>
            <Notifications/>
        </div>
        <TrendsSidebar isLoadAll={true}/>
    </main>
  )
}

export default page