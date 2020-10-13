import {
    gql
} from 'apollo-boost'


// 樣板語言的語法就像是graphql搜尋語法
// 搜尋全部的books
const getBooksQuery = gql `{
    books{
        id,
        title,
        genre,
    }
}`

const getAuthorQuery = gql `{
    authors{
        id
       name
       age
    }
}`

// 後面加驚嘆號表示必要不可忽略的引數
// $xxx，代表variable
const addBookMutation = gql `
    mutation($title:String!, $genre:String!, $authorId:ID!){
        addBook(title: $title, genre: $genre, authorId: $authorId){
            title
            genre
        }
    }`

// 透過book.id單一搜尋此book細節
const getBookQuery = gql`
    query($id:ID){
        book(id: $id){
            title
            genre
            author{
                id
                name
                age
                books{
                    id
                    title
                    genre
                }
            }
        }
    }
`

export {
    getBooksQuery,
    getAuthorQuery,
    addBookMutation,
    getBookQuery
}