import React from 'react';
import './App.css';

// apollo
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo' // 透過react-apollo綁定apollo與react相容，讓react能了解apollo套件

// components
import BookList from './components/BookList'
import AddBook from './components/AddBook'

// ApolloClient，類似ajax或axios功能
// 類似和mongoDB雲端交流一樣
// 前端透過這個網址來和graphql溝通互動
const client = new ApolloClient({
  // 注意!不是ur"l"，是ur"i"
   uri: "http://localhost:4000/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>GraphQL Books List </h1>
        <BookList />
    </div>
    </ApolloProvider>
  );
}

export default App;
