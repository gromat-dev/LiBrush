import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from "express"
import login from "./api/v1/login.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

const PORT = 7070

const app = express()

//report if server is working
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});

//login route CSP
app.use('/login',function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' https://cdn.jsdelivr.net https://fonts.googleapis.com https://www.facebook.com/; style-src * 'unsafe-inline'; font-src *; script-src 'self' 'unsafe-inline' https://code.jquery.com https://cdn.jsdelivr.net https://www.google.com https://www.gstatic.com https://*.facebook.net/; frame-src https://www.google.com/ https://connect.facebook.net/;"
  )
  next()
})

//v1 API JSON middleware
app.use("/api/v1/*",express.json())

//API routes
app.post("/api/v1/login", login)

//fallback route to interface
app.use('/', express.static(path.join(__dirname, '/interface')))