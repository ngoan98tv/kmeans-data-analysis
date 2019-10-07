import express  from 'express';
import fileUpload from 'express-fileupload';

const app = express();

app.use(express.static(process.cwd() + '/public'));
app.use(fileUpload());

app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString('vi-VN')} - ${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.post('/upload', (req, res) => {
    if (req.files.uploaded && req.files.uploaded.size > 0) {
        req.files.uploaded.mv("uploads/" + new Date().toISOString() + "+FILE+" + req.files.uploaded.name, (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send("File uploaded");
            }
        });
    }
});

app.listen(8000, () => {
    console.log("Server is listening on: http://localhost:8000");
});