const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const imageDownloader=require("image-downloader")
const multer=require("multer")
const fs=require("fs")
const Place=require("./models/Place")
const Booking = require("./models/Booking");


const app = express();
app.use(cors({
    
    origin: 'http://localhost:5173',
  }));
  app.use(express.json());

  app.use("/uploads",express.static(__dirname+'/uploads'))

mongoose.connect("mongodb://localhost:27017/resort");

const userSalt=bcrypt.genSaltSync(+process.env.SECRETSALT);



app.get("/test", (req, res) => {
  res.json("hello");
});

app.post("/register", async(req, res) => {
  const { name, mail, password } = req.body;
  try{
  const userDoc=await User.create({
    name,
    mail,
    password : bcrypt.hashSync(password,userSalt),
  });
  res.json(userDoc);
}catch(err){
    res.status(422).json(err);
}
});

app.post('/login', async (req,res) => {
    const {mail,password} = req.body;
    const userDoc = await User.findOne({mail});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          mail:userDoc.mail,
          id:userDoc._id
        }, process.env.JWTSECRET, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
          
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  });

  app.get("/profile",(req,res)=>{
    const {token}=req.cookies;
    if(token){
      jwt.verify(token,process.env.JWTSECRET,{},async(err,user)=>{
        if(err) throw err;
        const {name,mail,_id}=await User.findById(user.id);
        //As token has only mail and password we get name from db
        res.json({name,mail,_id});
      })
    }else{
      res.json(null)
    }
  })

  app.post("/logout",(req,res)=>{
    res.cookie("token","").json(true)
  })

  app.post("/uploadbylink",async(req,res)=>{
    const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' +newName,
  });
  res.json(newName)
  })

  const photoMiddleware=multer({dest:'uploads/'})
  app.post("/upload",photoMiddleware.array('photos',50) ,(req,res)=>{
  const uploadedFiles=[]
  for(let i=0;i<req.files.length;i++){
    const {path,originalname}=req.files[i];
    const parts=originalname.split('.')
    const ext=parts[parts.length-1]
    const newPath=path+'.'+ext
    fs.renameSync(path,newPath)
    
    uploadedFiles.push(newPath.replace('uploads\\',''));
  }
  res.json(uploadedFiles)
  })


  app.post("/places",async (req,res)=>{
    const {title,address,uploadedPhotos,description,facilities,extraInfo,checkin,checkout,maxGuests,price}=req.body;
    const {token}=req.cookies;
    jwt.verify(token,process.env.JWTSECRET,{},async(err,userDoc)=>{
      if(err) throw err;
      const placeDoc=await Place.create({
       owner:userDoc.id,
       title,address,description,photos:uploadedPhotos,facilities,extraInfo,checkIn:checkin,checkOut:checkout,maxGuests,price,
      })
      res.json(placeDoc)
    })
  })

  app.get("/user-places",async(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,process.env.JWTSECRET,{},async(err,userDoc)=>{
      const {id}=userDoc
      res.json(await Place.find({owner:id}))
    })
  })

  app.get("/places/:id",async(req,res)=>{
    const {id}=req.params
    res.json(await Place.findById(id))
  })



  app.put("/places",async(req,res)=>{
    const {token}=req.cookies;
    const {id,title,address,uploadedPhotos,description,facilities,extraInfo,checkin,checkout,maxGuests,price}=req.body;
    jwt.verify(token,process.env.JWTSECRET,{},async(err,userDoc)=>{
     if(err) throw err
     const placeDoc=await Place.findById(id)
     if(userDoc.id===placeDoc.owner.toString()){
      placeDoc.set({
        title,address,description,photos:uploadedPhotos,facilities,extraInfo,checkIn:checkin,checkOut:checkout,maxGuests,price,
      })
      await placeDoc.save()
      res.json("ok")
     }
    })
  })

  app.get("/places",async(req,res)=>{
    res.json(await Place.find())
  })

  app.post("/bookings",async(req,res)=>{
    const {token}=req.cookies
    jwt.verify(token,process.env.JWTSECRET,{},async(err,userDoc)=>{
    if(err) throw err;
    const {place,checkIn,checkOut,noOfGuests,name,mobile,price}=req.body;
    await Booking.create({
      place,checkIn,checkOut,noOfGuests,name,mobile,price,user:userDoc.id,
    }).then((doc)=>{
      
      res.json(doc)
    }).catch((err)=>{
      throw err;
    })
    })
   
  })

  app.get("/bookings",async(req,res)=>{
    jwt.verify(token,process.env.JWTSECRET,{},async(err,userDoc)=>{
    if(err) throw err;
    res.json(await Booking.find({user:userDoc.id}).populate("place"))
    })
  })


 

 

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
