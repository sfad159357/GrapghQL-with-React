const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    // (X)id:String,不用特別創id屬性，因為mongo會自動幫你新增id屬性
    title: String,
    genre: String,
    authorId: String,
})

// 輸出mongoDB模型，collection名稱為Books，用的架構就上面定義的型態
module.exports = mongoose.model('Book', bookSchema)