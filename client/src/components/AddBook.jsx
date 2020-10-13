import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {getBooksQuery,getAuthorQuery, addBookMutation} from '../queries/queries'
import { flowRight } from 'lodash'

export class AddBook extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            genre: "",
            authorId: "",
        }
    }

    displayAuthors = () => {
        const data = this.props.getAuthorQuery
        if (data.loading) {
            return <option disabled>Loading Authors</option>
        }
        else{
            return data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
        }
    }
    submitData = (e) => {
        e.preventDefault()
        const {title, genre, authorId} = this.state
        this.props.addBookMutation({
            // 將變數帶入參數
            variables: {
                title,
                genre,
                authorId
            },
            // 重新獲取搜尋序列，就會即時地在頁面render
            refetchQueries:[{query: getBooksQuery}]
        })
        this.setState({title:"",genre:"",authorId:""})
    }

    render() {
        return (
            <form id="add-book" onSubmit={this.submitData}> 
                <h3>Add the book:</h3>
            <div className="fields">
              <label>Title:</label>
              <input type="text" onChange={ e => this.setState({title: e.target.value})}></input>
            </div>
            <div className="fields">
              <label>Genre:</label>
                <input type="text" onChange={e => this.setState({genre: e.target.value})}></input>
            </div>
            <div className="fields">
                <label>Author:</label>
                <select type="select" onChange={e => this.setState({ authorId: e.target.value })}>
                    <option value=''>--</option>
                    {this.displayAuthors()}
              </select>
                </div>
                <input type="submit" value="Add" />
          </form>
        );
    }
}

// 如果要將兩個query放在一起綁定元件，這時就要用到flowRight函式來包在一起
// name，會將this.props之data屬性名稱改換成我們定義的名稱
export default flowRight(
    graphql(getAuthorQuery, { name: 'getAuthorQuery' }),
    graphql(addBookMutation, {name:'addBookMutation'})
)(AddBook)
