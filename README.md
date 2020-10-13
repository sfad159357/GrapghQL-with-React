# GrapghQL-with-React
Use the grapghQL package to qurey the data with the frontend of the React and the backend of the express.

##解說概要
1.在server端的部分使用node.js開發環境，引入express之模組，幫我們建立基礎port4000的伺服器。

2.在中介體引入graphql相關套件，銜接對graphql可視化頁面的路徑。

3.建立針對個別book和author搜尋架構，以及個別book新增架構，和針對全體books和authors搜尋架構，然後在grapghHTTP內進行配置。？

4.引入moogoDB模組幫我們與雲端Mongo altas建立server與雲端伺服器的連線，可將數據儲存放置雲端伺服器。

5.建立mongoDB存放數據的book和author模組。

6.安裝create-react-app套件，建立port:3000的本地端，幫我們快速建立react相關檔案

7.引入apollo相關兩個套件apollo-boost和react-apollo，前者可以支援將數據與graphql溝通和將javascript語法轉換成graphql搜尋語法，
後者可以將apollo套件和react相容。

8.將前端元件切分成三大部分BookList, addBook, BookDetail，另外建立gql特殊搜尋語法

9.將透過apollo溝通從server端取得資料，進行視覺的呈現。

10.透過index.css進行樣式及排版的呈現。

