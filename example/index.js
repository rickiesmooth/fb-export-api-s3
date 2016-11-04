const date = ~~(Date.now() / 1000)

const id = process.env.APP_ID
const secret = process.env.APP_SECRET
const bucket = process.env.BUCKET_ID
const fbS3 = require('../lib')

for (var service in body) {
  console.log(body[service][1])
  fbS3(body[service][0], body[service][1], bucket, { end: date, start: date - 86400 })
    .then((data) => console.log('yes'))
    .catch((err) => console.log(err))
}
