const express = require('express')
const app = express()
var bodyParser = require("body-parser");
const port = 3000

var fs = require("fs");
console.log("\n *STARTING* \n");
// Get content from file
var filterData = fs.readFileSync('filterdata.json', 'utf-8');
var findResults = fs.readFileSync("findResults.json");
// Define to JSON type
var jsonFilterData = JSON.parse(filterData);
var jsonFindResults = JSON.parse(findResults);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users', (req, res) => res.send('BOOM!'))

app.get('/filters', (req, res) => {
    res.send(JSON.stringify(jsonFilterData))
})

app.post('/filters', function (req, res) {
    var includedAuthors = req.body.includedAuthors;
    let resultFilter = new Array();
    if (includedAuthors && includedAuthors.length > 0) {
        includedAuthors.forEach(authorId => {
            jsonFindResults.forEach(article => {
                if (article.authorId == authorId) {
                    resultFilter.push(article);
                }
            })
        })
    } else {
        resultFilter = jsonFindResults
    }
    res.send(JSON.stringify(resultFilter));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))