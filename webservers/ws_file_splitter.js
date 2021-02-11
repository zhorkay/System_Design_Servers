const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');
const contentHash = require('content-hash')

//create a server object:
const myArgs = process.argv.slice(2);
const IDX = myArgs[0];
const PORT = myArgs[1];

const app = express();

app.use(express.static('public')); //to access the files in public folder

app.use(cors()); // it enables all cors requests
app.use(fileUpload({
    createParentPath : true
}));


app.post('/UploadChunks',(req, res) => {
    const fileName = req.query['fileName'];
    const chunkNumber = req.query['id'];
    const chunk = req.files.chunk;
    const contentH = contentHash.encode(chunk);


    const filePath = `${__dirname}/public/ws${IDX}/${fileName}${chunkNumber}`;
    console.log("filePath: " + filePath);
    chunk.mv(filePath, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                msg: "Error occured" ,
                details: err
            });
        }
        // returing the response with file path and name
        return res.send({
            name: fileName,
            path: filePath,
            contentHash: contentH,
            isSuccess: true
        });
    });
});

app.post('/UploadCompleted',(req, res) => {
    const fileName = req.query['fileName'];
    const chunkCount = req.query['chunkCount'];
    const filePath = `${__dirname}/public/ws${IDX}`;
    console.log("filePath: " + filePath);
    fs.readdir(filePath, (err, files) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                msg: "Error occured",
                details: err
            });
        }

        const cnt = getCount(files, fileName);

        if (cnt == chunkCount) {
            return res.send({
                name: fileName,
                path: filePath,
                isSuccess: true
            });
        }
        else {
            const errMsg = `Chunk count mismatch: ${cnt} instead of ${chunkCount}`;
            console.log(errMsg);
            return res.status(500).send({
                msg: "Error occured",
                details: errMsg
            });
        }
    });
});

function getCount(files, fileName) {
    let cnt = 0;
    files.forEach(file => {
        if (file.startsWith(fileName)) {
            cnt++;
        }
    });
    return cnt;
}

app.listen(PORT,() => {
    console.log(`${IDX}. file splitter WEB SERVER  listen on ${PORT}`);
});
