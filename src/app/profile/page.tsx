import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { env } from '~/env'
import getNodeSDK from '~/lib/getNodeSdk'

import Logout from '../_components/Logout'
import ThemeSelect from './_components/ThemeSelect'

export default async function Page() {
  const cookieStore = cookies()
  const session = cookieStore.get('cbo_short_session')

  if (!session) {
    if (env.NODE_ENV !== 'development') return redirect('/')

    return <Profile userId="SOME ID GOES HERE" username="josh@cursedtale.com" />
  }
  const sdk = getNodeSDK()

  let user
  try {
    user = await sdk.sessions().getCurrentUser(session.value)
    if (!user.isAuthenticated()) throw Error
  } catch (error) {
    return redirect('/')
  }

  return <Profile userId={user.getID()} username={user.getEmail()} />
}

function Profile({ userId, username }: { userId: string; username: string }) {
  return (
    <main className="mx-auto max-w-md space-y-8 p-4">
      <section className="mb-4 flex justify-between">
        <h1 className="text-xl">Profile Page</h1>

        <Logout />
      </section>

      <section>
        <p>User-ID: {userId}</p>
        <p>Username: {username}</p>
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
