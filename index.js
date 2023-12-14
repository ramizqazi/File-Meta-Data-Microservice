require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');

app.use(cors());
app.use(express.static('public'));
app.use('/public', express.static(process.cwd() + '/public'));

const storage = multer.memoryStorage(); // Use memory storage to handle files in memory
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileMetadata = {
    name: req.file.originalname,
    size: req.file.size,
    type: req.file.mimetype
  };

  console.log(fileMetadata);

  // Add your file processing logic here

  res.send(fileMetadata);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
