const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const multer = require('multer')

app.use(bodyParser.json())

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
let upload = multer({ storage: storage });

app.post('/api/image-upload', upload.single('image'), (req, res) => {
    const image = req.image;
    res.send(apiResponse({ message: 'File uploaded successfully.', image }));
});

function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results });
}

app.listen(3000, () => {
    console.log('Server started on port 3000...');
});