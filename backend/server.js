require("dotenv").config()
const express = require("express")
const webPush = require("web-push")
const SubscriptionModel = require("./subscriptionModel")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const port = 9000
const DatabaseName = "pushDb"
const DatabaseURI = `mongodb://localhost:27017/${DatabaseName}`

mongoose.set("strictQuery", false)
mongoose
  .connect(DatabaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected")
  })
  .catch((err) => console.log(err.message))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/subscribe", async (req, res, next) => {
  const newSubscription = await SubscriptionModel.create({ ...req.body })
  // return res.send ('hallo');
  const options = {
    vapidDetails: {
      subject: "mailto:myemail@example.com",
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY,
    },
  }
  try {
    await webPush.sendNotification(
      newSubscription,
      JSON.stringify({
        title: "Hello from server",
        description: "this message is coming from the server",
        image:
          "https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg",
      }),
      options
    )

    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.listen(port, () => console.log(`app running live on ${port}`))
