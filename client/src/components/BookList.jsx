import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
// Component
import BookDetail from './BookDetail';
import AddBook from './AddBook'



class BookList extends Component {
    // 透過BookList元件本身的state，來去傳遞book.id參數給BookDetail元件
    constructor(props) {
        super(props)
        this.state = {
            clicked: null
        }
    }

    displayBooks = () => {
        const { data } = this.props 
        // 如果資料還在載入，loading:true
        if (data.loading) {
          return <h2>Loading Books</h2>
        }
        else {
            return data.books.map((book) => (
                <li key={book.id} onClick={e => { this.setState({ clicked: book.id }) }}>{book.title}</li>
            ));
        }
    }
    
    render() {
        return (
            <div id="container">
            <div>
                <ul id="book-list">{this.displayBooks()}</ul>
                <AddBook />
            </div>
            <BookDetail bookId={this.state.clicked} />
          </div>
        );
    }
}

// react-apollo的graphql函式將BookList原件給綁定，使此元件能夠存取搜尋回來的data
export default graphql(getBooksQuery)(BookList)