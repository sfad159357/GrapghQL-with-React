const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose') // MongoDB ORM
const { url } = require('./mongoURL/mongoURL.json')
const cors =require('cors')

const app = express();

// server端允許跨源請求
app.use(cors())

mongoose.connect(url, {
    // 參2需要新增此物件參數之兩屬性，不然會跳error
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 一旦和Mongo連線，就呼叫回呼函式
mongoose.connection.once('open', () => {
    console.log('正在連接MongoDB')
})

// middleware, {schema}
// http://localhost:4000/graphql
app.use('/graphql', graphqlHTTP({
    // schema: schema
    schema,
    graphiql : true // 我們希望透過這個工具和graphQL進行連線
}))

// 一旦啟動app，就呼叫後面的回呼函式
app.listen(4000, () => {
    console.log("正在監聽4000 port")
})