import { Config, SDK } from '@corbado/node-sdk'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

import { env } from '~/env'
import { db } from '~/server/db'
import { users } from '~/server/db/schema/users'

const sdk = new SDK(
  new Config(env.NEXT_PUBLIC_CORBADO_PROJECT_ID, env.CORBADO_API_SECRET)
)

export function getNodeSDK() {
  return sdk
}

/**
 * Returns the corbado userId if the user is authenticated
 * If the corbado userId is not found in the database, it will be created
 */
export async function validateAuth() {
  const session = getUserSession()
  if (!session) return false

  try {
    const corbado_id = (
      await sdk.sessions().getCurrentUser(session.value)
    ).getID()

    const db_user = await db
      .select()
      .from(users)
      .where(eq(users.corbadoId, corbado_id))
      .get()

    if (!db_user) {
      await db.insert(users).values({ corbadoId: corbado_id })
    }

    return corbado_id
  } catch (e) {
    return false
  }
}

/**
 * Get the current user from the session or throw an error if not authenticated
 */
export async function getCorbadoUser() {
  const userId = await validateAuth()
  const session = getUserSession()

  if (!userId || !session) throw Error('Not authenticated')
  const user = await sdk.sessions().getCurrentUser(session.value)

  if (!user.isAuthenticated()) throw Error('Not authenticated')

  return user
}

/**
 * Get the current user from the session cookie
 */
function getUserSession() {
  const cookieStore = cookies()
  return cookieStore.get('cbo_short_session')
}

/**
 * Get the database user from the session cookie
 * Throw an error if the user is not found in the database
 */
export async function getUserId() {
  try {
    const authUser = await validateAuth()
    if (!authUser) throw Error('Not authenticated')

    return await db
      .select()
      .from(users)
      .where(eq(users.corbadoId, authUser))
      .get()
  } catch (error) {
    throw Error('Not authenticated')
  }
}
