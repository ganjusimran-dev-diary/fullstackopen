# NOTES

## 1 Simple web server

### 1.1. Import Statements
The initial application imports Node's built-in web server module
Node.js uses CommonJS modules
Currently, Node also supports the use of ES6 modules, but since the support is not quite perfect yet, we'll stick to CommonJS modules.
So we use require(string) instead of import export 

```js
const http = require('http')
```

### 1.2. Create Server
The code uses the createServer method of the http module to create a new web server.
An event handler is registered to the server that is called every time an HTTP request is made 
JSON.stringify(notes) is necessary because the response.end() method expects a string or a buffer to send as the response body.

```js
const app = http.createServer((request, response) => {
response.writeHead(200, { 'Content-Type': 'application/json' })
response.end(JSON.stringify(notes))
})
```

### 1.3. Bind server
- The last rows bind the http server assigned to the app variable, to listen to HTTP requests

```js
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

## 2. Web and Express

Many libraries have been developed to ease server-side development with Node, by offering a more pleasing interface to work with the built-in http module.
By far the most popular library intended for this purpose is Express.
Right at the beginning of our code, we're importing express
```js
const express = require('express')
const app = express()
```

Event handler that is used to handle HTTP GET requests made to the application's / root.
The event handler function accepts two parameters. The first request parameter contains all of the information of the HTTP request, and the second response parameter is used to define how the request is responded to.
Since the parameter is a string, Express automatically sets the value of the Content-Type header to be text/html.
```js
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
```

The second route defines an event handler that handles HTTP GET requests made to the notes path of the application:
```js
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
```
The request is responded to with the json method of the response object.
Express automatically sets the Content-Type header with the appropriate value of application/json.

You can make the server track our changes by starting it with the --watch option:
```sh
node --watch index.js
```

** ----- Move on to code implementation in index.js ---- **