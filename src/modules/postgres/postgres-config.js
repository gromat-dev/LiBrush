import PG from 'pg'
import { config } from 'dotenv'
config()
const pool = new PG.Pool() 

export default function query() {
    pool.query('SELECT * FROM accounts', (err, res) => {
        if (err) {
            throw err
        }
        console.log('user:', res.rows[0])
    })
}