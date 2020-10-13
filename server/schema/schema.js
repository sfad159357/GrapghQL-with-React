const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../DBmodels/book')
const Author = require('../DBmodels/author')
// 注意大小寫
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} = graphql

// dummy data

// queryType
const BookType = new GraphQLObjectType({
    name: 'Book',
    // fields函式
    fields: () => ({ // fields函式回傳物件，包含其Book屬性，其值為型態
        id: {
            type: GraphQLID
        }, // 這裡不能用一般的string
        title: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        // 書中有作者屬性
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // 這次前端不需要自己帶入引數args，而是直接連結此id的book物件(parent)
                // 在此book物件中透過本身authorId屬性，找尋authors陣列中的author.id = 此book.authorId(parent.authorId)中符合的物件
                // return _.find(authors, { id: parent.authorId })
                // 這次使用的是mongoDB的Author collection
                return Author.findById(parent.authorId)
            }

        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    // fields函式
    fields: () => ({ // fields函式回傳物件，包含其Book屬性，其值為型態
        id: {
            type: GraphQLID
        }, // 這裡不能用一般的string
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        // 新增作者中有書的屬性
        books: {
            // 這裡不能用type: BookType，因為作者可能有著作好幾本書，不是只有一本
            type: new GraphQLList(BookType), // 將Book型態轉為串列化
            resolve(parent, args) {
                // 這裏parent是authors陣列，要找尋符合book的authorId屬性
                // 這裡要用filter，用find只會回傳一個物件，要回傳多個物件必須要透過array包在一起
                // return _.filter(books, {authorId: parent.id})
                return Book.find({authorId: parent.id})
            }
        }
    })
})

// Note:為什麼fields不是fields: {...}物件型態，而是fields:()=>{...}函式型態
// 由於BookType底下有個屬性AuthorType，但javascript在runtime時，是由上而下執行，而AuthorType的定義還在下方，所以runtime到一半讀到undefined就會噴error
// 因為BookType和AuthorType彼此互相依賴，顛倒任何一方順序，另一方就沒被定義到
// 而使用function型態的好處就在於，直到完整的檔案跑完，所有func的定義也就被讀取到，才會開始真正執行這些func。

// 我們希望在查詢書的時候可以放入參數來查詢
// book(id:2){
//  title
//  genre
// }
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    // fields物件
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    // 實際上還是string的型態，而搜尋時int或sting都可以使用
                    type: GraphQLID
                }
            },
            // get data from db/ other source 
            resolve(parent, args) {
                // return _.find(books, {
                //     id: args.id
                // }) // 在book array找尋book(id:x)，回傳符合條件之陣列
                return Book.findById(args.id)
            }
        },

        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
            //  return _.find(authors, { id: args.id })
                return Author.findById(args.id)
            }
        },
        // 搜尋全部書
        books: {
            type: new GraphQLList(BookType),
            // fields沿用BookType
            resolve(parent, args) {
                // find({})參數是空物件時，代表尋找全部項目
                return Book.find({})
            }
        },
        // 搜尋全部作者
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
            }
        }
    }
})

// add data, change data
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    // 這裏的fields用物件型態
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type:  new GraphQLNonNull(GraphQLString)
                    
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                    
                }
            },
            // args是使用者要輸入的引數作為新增作者物件的屬性
            resolve(parent, args) {
                // 這是創的新實例用的class是mongoDB的Author model
                let author = new Author({
                    name: args.name,
                    age: args.age,
                })
                // author物件已經是Author model的實例，架構已被定義好了，save會透過mongo uri傳送到雲端mongodb
                // 前面要加個return回傳，才能在graphql顯示出data
                return author.save()
            }
        },

        addBook: {
            type: BookType,
            args: {
                // new GraphQLNonNull(xxx)代表忽略輸入這個引數
                title: { type: new GraphQLNonNull(GraphQLString) },
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID)
                },
            },
            resolve(parent, args) {
                let book = new Book({
                    title: args.title,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    // 使用者可以做搜尋
    query: RootQuery,
    // 使用者可以對data新增或修改
    mutation: Mutation
})