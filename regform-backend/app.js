const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()


const router = require("./router/router")
const HttpError = require("./error/http-error")

app.use(cors())
app.use(bodyParser.json())

app.use("/api", router)

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404)
  throw error
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || "an unknown error." })
})


app.listen(5010, function () {
  console.log("listening on port 5010")
})
