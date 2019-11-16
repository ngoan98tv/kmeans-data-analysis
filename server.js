import express  from 'express';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';

const app = express();

app.use(express.static(process.cwd() + '/public'));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { maxAge: 3600000 } }));

app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString('vi-VN')} - ${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.post('/upload', async (req, res) => {
    if (req.files.uploaded && req.files.uploaded.size > 0) {
        const timestamp = new Date()*1;
        const basename = req.files.uploaded.name.substring(0, req.files.uploaded.name.lastIndexOf('.'));
        const xlsFile = basename +  '-' + timestamp + '.xlsx';
        const csvFile = basename +  '-' + timestamp + '.csv';
        req.files.uploaded.mv("uploads/" + xlsFile, (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                req.session.filePath = "uploads/" + csvFile;
                const processing = spawn("lib/convert-to-csv.sh", ["uploads/" + xlsFile, "uploads/" + csvFile]);
                processing.stdout.on("data", (data) => {
                    res.json({
                        datafields: data.toString().replace('\n', '').split(',')
                    });
                });
            }
        });
    }
});

app.post('/preview', async (req, res) => {
    const {fields, lines} = req.body;
    const preview = spawn(`lib/preview.py`, [req.session.filePath].concat(lines, fields));
    preview.stdout.on("data", (data) => {
        res.json(data.toString('utf-8'));
    });
});

app.post('/cluster', async (req, res) => {
    const { numOfClusters, maxLoops, fields } = req.body;
    const { filePath } = req.session;
    const cluster = spawn('lib/cluster.py', [filePath].concat([numOfClusters, maxLoops], fields));
    cluster.stdout.on("data", (data) => {
        res.json(data.toString('utf-8'));
    });
});

app.get('/download/:group', async (req, res) => {
    const group = req.params.group;
    const { filePath } = req.session;
    const result = '/'
                    + filePath.substring(0, filePath.lastIndexOf('-'))
                    + '-group' + group + '-'
                    + filePath.substring(filePath.lastIndexOf('-') +1);
    console.log(result);
    res.download(process.cwd() + result, 'group' + group + '.csv');
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.listen(8000, () => {
    console.log("Server is listening on: http://localhost:8000");
});