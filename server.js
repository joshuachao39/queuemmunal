const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()


// serve static assets normally
app.use(express.static(__dirname + '/build'))

app.get('*', function (request, response){
    console.log ('request at *');
    response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(port)
console.log ('listening at port '+port);
