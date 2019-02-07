const express = require('express')
const app = express()
const port = 3000

var fs = require("fs");
console.log("\n *STARTING* \n");
// Get content from file
var filterData = fs.readFileSync("filterdata.json");
// Define to JSON type
var jsonFilterData = JSON.parse(filterData);

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users', (req, res) => res.send('BOOM!'))

app.get('/filters', (req, res) =>{ 
    res.send(JSON.stringify(jsonFilterData))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))