import { createPool } from 'mysql2/promise'

const pool = createPool({
  database: 'myminimarket',
  user: 'u9cpog3yuonsdphsjjlh',
  host: 'us-east.connect.psdb.cloud',
  password: 'pscale_pw_53LRIKRyraeRtDDDTgQLzBJAOP1gEpGvY1QyGOt8Wxp',
  ssl: {
    rejectUnauthorized: false
  }
})

export default pool
