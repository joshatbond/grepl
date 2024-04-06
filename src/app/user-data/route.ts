import { type NextRequest, NextResponse } from 'next/server'

import getNodeSDK from '~/lib/getNodeSdk'

const sdk = getNodeSDK()

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) return NextResponse.json({ status: 401 })

  try {
    const token = authHeader.replace('Basic ', '')
    const user = await sdk.sessions().getCurrentUser(token)

    if (!user.isAuthenticated()) throw Error

    return NextResponse.json({ email: user.getEmail() }, { status: 200 })
  } catch (e) {
    NextResponse.json({ status: 403 })
  }
}
