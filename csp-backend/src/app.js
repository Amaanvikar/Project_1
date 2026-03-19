const express  = require("express");
const multer = require('multer');
const uploadFile = require('./service/storage.service');
const postModel = require('./models/post.model');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({storage: multer.memoryStorage()});

app.post('/create-post', upload.single('image'), async(req, res) => {

    console.log(req.body);  
    console.log(req.file);   

    const result = await uploadFile(req.file.buffer);


   const post =  await postModel.create({
        image: result.url,
        caption: req.body.caption,
    });

    return  res.status(201).json({
        message: 'Post created successfully',
        post,
    })
})

app.get('/post', async (req, res) => {

    const posts = await postModel.find()

    return res.status(200).json({
        message: 'Posts fetched successfully',
        posts,
    })
})


module.exports = app;