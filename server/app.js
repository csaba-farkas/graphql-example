const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors())

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${
    process.env.MONGODB_PASSWORD
  }@cluster0-9kzb0.azure.mongodb.net/test?retryWrites=true&w=majority`
)
mongoose.connection.once('open', () => {
  console.log('connected to database')
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)

app.listen(4000, () => {
  console.log('hello')
})
