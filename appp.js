const express = require('express')
const app = express()


const fs = require('fs');

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const projectId = "2OFpkjdSKUiJCRJfbI9QRZRICV8";
const projectSecret = "6eeb6d7bf188824bfb895b953c98ae08";

const auth =
    "Basic" +
    " " +
    Buffer.from(projectId + ":" + projectSecret).toString("base64");

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('ipfs.infura.io', '5001', {
    protocol: 'https', headers: {
        authorization: auth,
    },
})

// var path = require('path');
// app.use(express.static(path.resolve('./public')));

app.get('/', function (req, res) {
    //   res.send('Hello World')
    res.sendFile(__dirname + '/src/indexx.html');
})

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    
    
    console.log(req.body.file);
    var data = new Buffer.from(fs.readFileSync(req.file.path));
    ipfs.add(data, function (err, file) {
        if (err) {
            console.log(err);
        }
        console.log(file);
        res.send(file[0].hash);
    })

})

app.get('/download/:ID', function (req, res) {
    console.log(req.params.ID);
    res.redirect('https://educhain.infura-ipfs.io/ipfs/' + req.params.ID);
})

app.listen(3001)