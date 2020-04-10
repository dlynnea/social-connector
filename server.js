const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db')
const app = express();

connectDB();

app.use(fileUpload());

app.use(express.json({ extended: false }))

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//

app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.image;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    })
});

//

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`))

