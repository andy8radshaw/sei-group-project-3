const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/hikr-db-11'
const port = process.env.PORT || 8000
const secret = process.env.SECRET || 'andy kuriko purvi'

module.exports = {
  dbURI,
  port,
  secret
}