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

export async function validateAuth() {
  const cookieStore = cookies()
  const session = cookieStore.get('cbo_short_session')
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
