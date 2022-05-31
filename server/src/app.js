const express = require('express');
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser');

const routes = require('./routes')

const {port} = require('./config')
const os = require('os');



const db = require('./models')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use('/uploads',express.static('uploads')); 
app.use(express.json({limit: '50mb'})); 
app.use(express.urlencoded({limit: '50mb', extended: true})); 

app.use(cors()); 

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};


app.use('/api', routes);
app.use('/api', require('./routes/auth'))


 
app.listen(port, function () {
  db.connect();
  console.log(`server listening on port server listening on port ${port}`)
})

