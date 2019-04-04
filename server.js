const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const port =  process.env.PORT || 3000
const listener = () => {console.log(`Listening in on port ${port}.`)}
const fs = require("fs");

app.use(express.static('public'))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*")
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.disable('x-powered-by')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.post('/', (req, res, next) => {
  res.json({victory: "yay"})
})

app.get('/pdf', (req, res, next) => {

 function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}

  let filePath = "/Users/tymondragon/workspace/nodePdf/public/forLoops.pdf";

  fs.readFile(filePath , function (err,data){

    res.set({
      "Content-Type" : "application/pdf",
      "Content-Disposition" : "inline",
      "Content-Length" : getFilesizeInBytes(filePath),
      'Cache-Control': 'must-revalidate',
      'Expires' : 0
    });
    res.send(data);

  });
})

app.use((req, res, next) => {
  res.status(404).json({error:{message:"404 Not Found"}})
})

app.use((err, req, res, next) => {
  res.status(err.status).json({error:err})
})

app.listen(port, listener)

module.exports = app