import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from "express"
import login from "./api/v1/login.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

const PORT = 7070

const app = express()

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' https://cdn.jsdelivr.net https://fonts.googleapis.com; style-src *; font-src *; script-src 'self' https://code.jquery.com https://cdn.jsdelivr.net https://www.google.com https://www.gstatic.com; frame-src https://www.google.com/"
  )
  next()
})

app.use('/', express.static(path.join(__dirname, '/interface')))

app.post("/api/v1/login", login)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});
