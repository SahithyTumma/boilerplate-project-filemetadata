var express = require('express');
var cors = require('cors');
require('dotenv').config()
let bodyParser = require('body-parser');
const multer = require('multer');

var app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Extract file information
  const fileInfo = {
    filename: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  // Send file information in the response
  res.json(fileInfo);
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
