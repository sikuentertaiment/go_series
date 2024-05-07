const express = require('express');
const cors = require('cors');
const formidable = require('express-formidable');
const axios = require('axios');
const crypto = require('crypto');
const md5 = require('md5');
const adminfb = require("firebase-admin");
const { getDatabase } = require('firebase-admin/database');
const { getStorage, getDownloadURL, getFileBucket } = require('firebase-admin/storage');
const serviceAccount = require("./thebattlehit-firebase-adminsdk-grujt-b725b54b6c.json");
adminfb.initializeApp({
  credential: adminfb.credential.cert(serviceAccount),
  databaseURL: "https://thebattlehit-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageUrl:"gs://thebattlehit.appspot.com"
});

const db = getDatabase();
const st = getStorage().bucket('gs://thebattlehit.appspot.com');

const app = express();

app.use(formidable());
app.use(cors());

// define the routes

// client routes
app.get('/home',async (req,res)=>{
	try{
		const data = await getFrontData();
		res.json(data);
	}catch(e){
		res.json({valid:false,message:"Fail to process fron data!"});
	}
})
app.get('/s',async (req,res)=>{
	// getting data by keyword, searching function
})


// admin routes
app.post('/new',async (req,res)=>{
	// route for adding new data
})

// define the functions
const getFrontData = ()=>{
	return new Promise((resolve,reject)=>{

	})
}


app.listen(8080,()=>{
	console.log('Listening on port 8080');
})

module.exports = app;
