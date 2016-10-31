const date = ~~(Date.now() / 1000)

const id = process.env.APP_ID
const secret = process.env.APP_SECRET
const bucket = process.env.BUCKET_ID
const fbS3 = require('../lib')

fbS3(id, secret, bucket, { end: date, start: date - 86400 })
  .then((data) => {
    console.log('updated')
  })
  .catch((err) => console.log(err))
