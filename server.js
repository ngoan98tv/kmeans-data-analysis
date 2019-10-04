import express  from 'express';

const app = express();

app.use(express.static(process.cwd() + '/public'));

app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString('vi-VN')} - ${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.listen(8000, () => {
    console.log("Server is listening on: http://localhost:" + 8000);
});