import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import getNodeSDK from '~/lib/getNodeSdk'

import Logout from '../_components/Logout'

export default async function Profile() {
  const cookieStore = cookies()
  const session = cookieStore.get('cbo_short_session')

  if (!session) return redirect('/')
  const sdk = getNodeSDK()

  let user
  try {
    user = await sdk.sessions().getCurrentUser(session.value)
    if (!user.isAuthenticated()) throw Error
  } catch (error) {
    return redirect('/')
  }

  return (
    <div>
      <h1>Profile Page</h1>

      <p>User-ID: {user.getID()}</p>
      <p>Username: {user.getName()}</p>

      <Logout />
    </div>
  )
}
