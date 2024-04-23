import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { env } from '~/env'
import { getUser } from '~/lib/auth'

import Logout from '../_components/Logout'
import ThemeSelect from './_components/ThemeSelect'

export default async function Page() {
  try {
    const user = await getUser()

    return <Profile userId={user.getID()} username={user.getEmail()} />
  } catch (error) {
    if (env.NODE_ENV === 'development') {
      return <Profile userId="SOME ID GOES HERE" username="foo@example.com" />
    }

    return redirect('/')
  }
}

function Profile({ userId, username }: { userId: string; username: string }) {
  return (
    <main className="mx-auto max-w-xl space-y-8 p-4">
      <section className="mb-4 flex justify-between">
        <h1 className="text-3xl">Profile Page</h1>

        <Logout />
      </section>

      <section>
        <h2 className="text-xl">User Info</h2>
        <hr className="mb-2 border-selectPlaceholder" />
        <div className="flex justify-between">
          <span>Id</span>
          <span>{userId}</span>
        </div>
        <div className="flex justify-between">
          <span>Email</span>
          <span>{username}</span>
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <span>Theme</span>

          <ThemeSelect />
        </div>
      </section>
    </main>
  )
}
