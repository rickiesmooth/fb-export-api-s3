var AWS = require('aws-sdk')
AWS.config.region = 'eu-west-1'

const s3 = new AWS.S3()
const date = ~~(Date.now() / 1000)

const fb = require('fb-export-api')

const uploadFile = (Bucket, Body, period) => {
  s3.upload({
    Bucket,
    Key: `${period.end || date}.gz`,
    Body,
    ContentType: Body.headers['content-type']
  }, (err) => {
    if (err) { throw err } else {
      console.log('done')
      return
    }
  })
}

module.exports = (appId, appSecret, bucket, period) => new Promise((resolve, reject) => {
  fb.init(appId, appSecret)
    .then((data) => fb.download(data, period))
    .then((response) => uploadFile(bucket, response, period))
    .catch((err) => console.log(err))
})
