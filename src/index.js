import { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from "express"

const __dirname = dirname(fileURLToPath(import.meta.url))

const PORT = 7070

const app = express()
app.use('/', express.static(`${__dirname}/interface`))

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});
