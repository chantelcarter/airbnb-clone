### run server
- `nodemon index.js`

### password encryption
- `yarn add bcryptjs`

### CORS set up
- `yarn add cors`
```
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

### Connecting register page with api test
```
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

app.get('/test', (req,res) => {
    res.json('test ok')
})

app.listen(4000)
```
- inspect Vite + React page
- go to Network
- refresh page
- clear network
- press "Register" button
- click "test"
- Preview and Responce tab should say "test ok"