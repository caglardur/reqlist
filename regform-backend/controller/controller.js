const db = require("../database/database")
const HttpError = require("../error/http-error")

let tempData = []

const getItems = async (req, res, next) => {
  let itemArray
  try {
    itemArray = await db.execute("SELECT * FROM reglist")
  } catch (err) {
    const error = new HttpError("could not be done.", 500)
    return next(error)
  }

  res.status(200).json(itemArray[0])
}

const postItem = async (req, res, next) => {
  const { name, email, position, password } = req.body
  const postDate = new Date().getTime()

  const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress


  if (!name || !email || !password) {
    return res.status(400).json({ message: "Eksik bilgi girdiniz." })
  }

  const oldUserIndex = tempData.findIndex(data => data.userIp === userIp)

  // gönderi sıklığı kontrolü
  if (oldUserIndex > -1) {
    const newDifferance = Math.ceil((postDate - tempData[oldUserIndex].postDate) / 1000)

    if (tempData[oldUserIndex].blocked === true) {
      if (tempData[oldUserIndex].blockEnd > postDate) {
        const remainingTime = Math.ceil((tempData[oldUserIndex].blockEnd - postDate) / 1000)
        return res.status(429).json({ message: "10 saniye içerisinde birden fazla kayıt girdiğiniz için isteğiniz engellendi. " + remainingTime + " saniye sonra tekrar deneyiniz." })
      } else {
        tempData[oldUserIndex].blocked = false
        tempData[oldUserIndex].postDate = postDate
        tempData[oldUserIndex].difference = 10
      }
    } else {
      if (newDifferance + tempData[oldUserIndex].difference < 10) {
        const blockEnd = parseInt(postDate) + 90000
        tempData[oldUserIndex].blocked = true
        tempData[oldUserIndex].blockEnd = blockEnd
        const remainingTime = Math.ceil(parseInt((blockEnd - postDate) / 1000))
        return res.status(429).json({ message: "10 saniye içerisinde birden fazla kayıt girdiğiniz için isteğiniz engellendi. " + remainingTime + " saniye sonra tekrar deneyiniz." })
      } else {
        tempData[oldUserIndex].postDate = postDate
        tempData[oldUserIndex].difference = newDifferance
      }
    }
  } else {
    tempData.push({ userIp, postDate, difference: 10, blocked: false, blockEnd: false })
  }

  try {
    await db.execute("INSERT INTO reglist (name,email,position,password) VALUES(?,?,?,?)", [name, email, position, password])
  } catch (err) {
    const error = new HttpError("Could not be done.", 500)
    return next(error)
  }

  res.status(201).json({ message: "kaydedildi" })
}

exports.getItems = getItems
exports.postItem = postItem