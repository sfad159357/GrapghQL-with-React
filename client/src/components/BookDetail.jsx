import React, { Component } from 'react'
import { graphql } from "react-apollo"
import {getBookQuery} from "../queries/queries"


class BookDetail extends Component {
    displayBookDetail() {
        const { data } = this.props
        if (data.book) {
            return (
                <div>
                    <h3>Title: {data.book.title}</h3>
                    <p>Genre: {data.book.genre}</p>
                    <p>Author: {data.book.author.name}</p>
                    <p>All book by this author:</p>
                    <ul className="other-book">
                        {data.book.author.books.map(book => <li key={book.id}>{book.title}</li>)}
                    </ul>
                </div>
            )
        }else return <div>No book clicked.</div>
    }

    render() {
            console.log(this.props);
        return (
            <div id='book-detail'>
                <h2>Output book details:</h2>
                {this.displayBookDetail()}
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    
    // 因為在BookList點擊單一的Book而新增bookId的props屬性
    // 一旦更新props或新的props進來，就重新呼叫函式
    options: (props) => {
        // 將獲得的props.bookId作為gql的參數帶入搜尋
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetail)
