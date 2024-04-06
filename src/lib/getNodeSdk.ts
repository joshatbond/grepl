import { Config, SDK } from '@corbado/node-sdk'

import { env } from '~/env'

const sdk = new SDK(
  new Config(env.NEXT_PUBLIC_CORBADO_PROJECT_ID, env.CORBADO_API_SECRET)
)

export default function getNodeSDK() {
  return sdk
}
