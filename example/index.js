const date = ~~(Date.now() / 1000)

const id = process.env.APP_ID
const secret = process.env.APP_SECRET
const bucket = process.env.BUCKET_ID
const upload = require('../lib')

upload(id, secret, bucket, { end: date, start: date - 86400 })
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
