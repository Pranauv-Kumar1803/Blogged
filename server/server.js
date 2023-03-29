require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Blog = require('./Blog');
const User = require('./User');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyJWT = require('./verifyJWT');

// middleware
app.use(express.urlencoded({limit:'50mb', extended: true }));
app.use(express.static(path.join(__dirname + '/../client/build')));
app.use(cors({origin:'http://localhost:3000', methods: ["GET", "POST", "PUT", "DELETE"], credentials: true,exposedHeaders: ['Set-Cookie', 'Date', 'ETag']}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit:'50mb', extended: false,parameterLimit:50000 }));
app.use(bodyParser.json({limit:'50mb'}));
app.use(express.json({limit: '50mb'}));


// main
app.get('/blogs', async (req, res) => {
    const b = await Blog.find().exec();
    // console.log(b);
    if (!b) {
        return res.status(404).json({ 'message': 'blog not found' });
    }

    let data = [];

    for (const it of b) {
        console.log(it);
        const u = await User.findOne({email:it.editor});
        if(it.editor)
        {
            await data.push({...it._doc,img:u.profilePic});
        }
        else
        {
            await data.push({...it._doc,img:''});
        }    
    }
    // console.log(data);

    await res.status(200).json(data);
})

app.post('/register', async (req, res) => {
    console.log('inside register');
    console.log(req.body);
    const info = req.body;
    console.log(info);

    const d = await User.findOne({name:info.name}).exec();
    if(!d)
    {
        // const p = await bcrypt.hash(info.pwd,10);
        const p = info.pwd;
        const r = await new User({
            name:info.name,
            email:info.email,
            pwd:p
        });
        await r.save();
    
        res.json(info);
    }
    else
    {
        res.status(403).json({"message":'username must be unique'});
    }

})

app.post('/login',async (req,res)=>{
    console.log('inside login');
    const info = req.body;

    const d = await User.findOne({name:info.name}).exec();
    if(!d)
    {
        return res.status(404).json({'message':'user not found'});
    }

    if(d.pwd==info.pwd)
    {
        const access_token = await jwt.sign(
            {
                name: info.name,
                email:d.email
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        )
    
        console.log(access_token);
        res.cookie('auth', access_token,{httpOnly:true});
        res.json({name:d.name,email:d.email});
    }
})

app.get('/isAuth',async(req,res)=>{
    console.log('inside verifyJWT');
    const auth = req.cookies.auth;
    if(!auth) return res.sendStatus(403);

    console.log(auth);

    jwt.verify(auth,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.sendStatus(403);
        // console.log(decoded.name);
        res.status(200).json({name:decoded.name,email:decoded.email})
    })
});

app.use(verifyJWT);

app.get('/user-details/:email',async(req,res)=>{

    const user = await User.findOne({email:req.params.email});

    if(!user) return res.status(404).json({'message':'login again'});

    res.status(200).json(user)
})

app.post('/update-profile',async(req,res)=>{
    console.log('inside update profile')
    const info = req.body.info;

    const user = await User.findOne({email:req.body.email}).exec();

    if(!user)
    {
        return res.status(404).json({'message':'user not found'});
    }

    user.profilePic = req.body.images;
    user.name = info.name;
    user.email = info.email;

    await user.save();

    console.log(user);

    res.status(200).json(user);

})

app.post('/blogs', async (req, res) => {
    console.log(req.user)

    if (!req.user) {
        return res.status(403).json({ 'message': 'please login/register' });
    }
    if (!req?.body) return res.status(403).json({ 'message': 'body must be present' });
    const b = req.body;
    console.log(b);
    const title = b.title;
    const body = b.body;
    const id = b.idee;
    // console.log(b.image);
    const mainImg = b.image || 'https://media.istockphoto.com/id/1391605502/photo/default-defined-in-a-business-dictionary.jpg?b=1&s=170667a&w=0&k=20&c=Yx2iAUxiVjfFDFT7hzKCPbPK-V0ylU6ff4ubxiOku0o='
    const obj = { title: title, body: body, dateTime: new Date(), idee: id,editor:b.editor,mainImage:mainImg,tags:b.tags };

    const r = await new Blog(obj);
    await r.save();
    res.status(201).json(obj);
})

app.delete('/blogs/:id', async (req, res) => {
    console.log('inside delete')
    if (!req.user) {
        return res.status(403).json({ 'message': 'please login/register' });
    }
    const id = req.params.id;
    console.log(id);

    // const d = await Blog.find({id:`${id}`}).exec();
    const d = await Blog.findOne({ idee: id });
    console.log(d);
    if (!d) {
        return res.status(404).json({ 'message': 'blog not found' });
    }
    const r = await Blog.findOneAndDelete({ idee: id }).exec();
    res.status(200).json(r);
})

app.put('/blogs/:id', async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ 'message': 'please login/register' });
    }
    const id = req.params.id;

    const title = req.body.title;
    const body = req.body.body;
    const tags = req.body.tags;
    const image = req.body.image;
    const date = req.body.dateTime;

    const d = await Blog.findOne({ idee: id });
    if (!d) {
        return res.status(404).json({ 'message': 'blog not found' });
    }
    d.title = title;
    d.body = body;
    d.dateTime = new Date();
    d.mainImage = image;
    d.tags = tags;

    await d.save().then(() => {
        console.log('changed');
    })

    res.status(200).json(d);
})

app.get('/logout',(req,res)=>{
    console.log('in logout');
    res.clearCookie('auth');

    res.status(200).json({'message':'done'})
})

mongoose.connect('mongodb+srv://rpk:Rpk1803@cluster0.r1pjs.mongodb.net/react-nodejs-try?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    app.listen(5500, () => {
        console.log('server started in port 5500');
    })
})