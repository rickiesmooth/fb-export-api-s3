'use strict'
const AWS = require('aws-sdk')
AWS.config.region = 'eu-west-1'

const s3 = new AWS.S3()
const FB = require('fb-export-api')

class Storage extends FB {
  upload (Bucket, period, Body) {
    return new Promise((resolve, reject) => {
      s3.upload({
        Bucket,
        Key: `${this.id}/${period.end}.gz`,
        Body,
        ContentType: Body.headers['content-type']
      }, (err, data) => {
        if (err) { reject(err) } else {
          resolve(data, err)
        }
      })
    })
  }
}

module.exports = (id, secret, bucket, period) => new Promise((resolve, reject) => {
  const storage = new Storage(id)
  storage.init(secret)
    .then((token) => storage.query(token, period))
    .then((res) => storage.upload(bucket, period, res)
    .then(() => resolve(storage)))
})
