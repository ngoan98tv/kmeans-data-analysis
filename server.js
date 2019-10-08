import express  from 'express';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';

const app = express();

app.use(express.static(process.cwd() + '/public'));
app.use(fileUpload());
app.use(session({ secret: 'keyboard cat' }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString('vi-VN')} - ${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.post('/upload', async (req, res) => {
    if (req.files.uploaded && req.files.uploaded.size > 0) {
        const fileName = new Date().toISOString() + "+" + req.files.uploaded.name;
        req.files.uploaded.mv("uploads/" + fileName, (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                req.session.filePath = "uploads/" + fileName;
                const processing = spawn("lib/process.sh", [req.session.filePath]);
                processing.stdout.on("data", (data) => {
                    res.json({
                        data: data.toString().replace('\n', '').split(',')
                    });
                });
            }
        });
    }
});

app.listen(8000, () => {
    console.log("Server is listening on: http://localhost:8000");
});