import { games } from './games'
import { users } from './users'

export const schema = { schema: { ...users, ...games } }
