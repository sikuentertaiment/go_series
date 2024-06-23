const express = require('express');
const cors = require('cors');
const formidable = require('express-formidable');
const axios = require('axios');
const crypto = require('crypto');
const md5 = require('md5');
const adminfb = require("firebase-admin");
const { getDatabase } = require('firebase-admin/database');
const { getStorage, getDownloadURL, getFileBucket } = require('firebase-admin/storage');
const serviceAccount = require("../credentials/warungkuproject-45a28-firebase-adminsdk-ljd7p-0da92e61e4.json");
adminfb.initializeApp({
  credential: adminfb.credential.cert(serviceAccount),
  databaseURL: "https://warungkuproject-45a28-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageUrl:"gs://warungkuproject-45a28.appspot.com"
});
const clicksflysign = 'afa975b031fbfba062d51e3efd3cca5344d14a14';

const db = getDatabase();
const st = getStorage().bucket('gs://warungkuproject-45a28.appspot.com');

const app = express();

app.use(formidable());
app.use(cors());

// define the routes

// client routes
app.get('/home',async (req,res)=>{
	try{
		let data = await getFrontData();
		// section to proces the data before push it back to the client

		res.json({valid:true,data,message:'Successfuly get the data!'});
	}catch(e){
		res.json({valid:false,message:"Fail to process fron data!"});
	}
})
app.get('/s',async (req,res)=>{
	// getting data by keyword, searching function
	res.send('helloworld');
})


// admin routes
app.post('/newseries',async (req,res)=>{
	// route for adding new data
	handleNewSeries(req,res);
})

// define the functions
const getFrontData = ()=>{
	return new Promise(async (resolve,reject)=>{
		const data = (await db.ref('/').get()).val();
		resolve(data);
	})
}
const handleNewSeries = (req,res)=>{
	tryBlock(async (req,res)=>{
		// handling file, uploading, and getting the paths also
		// handling clicksfly link
		// handle kategori
		// normalize the data, save it
		let data = handleAdditional(await handleFile(parseJSON(req.fields,['keterangan','link_batch','link_episode','kategori']),req.files));
		data = await handleLinkClicksFly(data);
		const series_id = getNewSeriesID();
		await handleKategori(data.kategori,series_id);
		await db.ref(`series/${series_id}`).set(data);
		res.json({valid:true,message:'Series successfuly added!'});
	},req,res);
}

const tryBlock = (fn,req,res)=>{
	try{
		fn(req,res);
	}catch(e){
		res.json({valid:false,message:e.message});
	}
}

const handleFile = (fields,files)=>{
	return new Promise(async (resolve,reject)=>{
		let index = 0;
		for(let i in files){
			const file = files[i];
			const destination = `${new Date().getTime()}.${file.type.split('/')[1]}`;
			await st.upload(file.path,{destination,resumable:true})
			fields[i] = await getDownloadURL(st.file(destination));
			index += 1;
		}
		if(!index)
			fields = handleEkternalLinks(fields);
		resolve(fields);
	})
}

const parseJSON = (param,param2)=>{
	param2.forEach((p)=>{
		param[p] = JSON.parse(param[p]);
	})
	return param;
}

const handleKategori = (param,param2)=>{
	return new Promise(async (resolve,reject)=>{
		const kategori = (await db.ref('kategori').get()).val()||{};
		param.forEach((p)=>{
			if(!kategori[p]){
				kategori[p] = [];
			}
			kategori[p].push(param2);
		})
		await db.ref('kategori').set(kategori);
		resolve(true);
	})
}

const getNewSeriesID = ()=>{
	return `sID_${new Date().getTime()}`;
}

const getDateCreate = ()=>{
	// Get current date and time
	const now = new Date();

	// Format options for date
	const dateOptions = {
	  weekday: 'long', // full day of the week (e.g., Monday)
	  year: 'numeric',
	  month: 'long', // full month name (e.g., January)
	  day: 'numeric', // day of the month (e.g., 1)
	};

	// Format options for time
	const timeOptions = {
	  hour: 'numeric',
	  minute: 'numeric',
	  second: 'numeric',
	  hour12: false, // Use 24-hour format
	};

	// Format the date
	const formattedDate = new Intl.DateTimeFormat('id-ID', dateOptions).format(now);

	// Format the time
	const formattedTime = new Intl.DateTimeFormat('id-ID', timeOptions).format(now);

	return formattedDate + ' ' + formattedTime;
}

const handleAdditional = (param)=>{
	return Object.assign(param,{
		date_create:getDateCreate(),
		last_edit:getDateCreate()
	})
}

const handleLinkClicksFly = (data)=>{
	return new Promise(async (resolve,reject)=>{
		for(let i in data.link_batch){
			const link = data.link_batch[i];
			const clicksflylink = await new Promise((resolve,reject)=>{
				axios.get(getclicksflylink(link.link,getAlias()))
			  .then(response => {
			    resolve(response.data.shortenedUrl)
			  })
			  .catch(error => {
			    resolve('ERROR: FAIL GETTING THE SHORTED LINK');
			  });		
			})
			data.link_batch[i].shortenedUrl = clicksflylink;
		}
		for(let i in data.link_episode){
			const link = data.link_episode[i];
			const clicksflylink = await new Promise((resolve,reject)=>{
				axios.get(getclicksflylink(link.link,getAlias()))
			  .then(response => {
			    resolve(response.data.shortenedUrl)
			  })
			  .catch(error => {
			    resolve('ERROR: FAIL GETTING THE SHORTED LINK');
			  });		
			})
			data.link_episode[i].shortenedUrl = clicksflylink;
		}
		resolve(data);
	})
}

const getclicksflylink = (dest,alias)=>{
	return `https://clicksfly.com/api?api=${clicksflysign}&url=${dest}`;
}

const getAlias = ()=>{
	return `gsref${new Date().getTime()}`;
}

const handleEkternalLinks = (fields)=>{

	let banner_series_link = fields.banner_series_link;
	let logo_series_link = fields.logo_series_link;

	fields.banner_series = banner_series_link;
	fields.logo_series = logo_series_link;

	// deleting the eksternal_links
	delete fields.banner_series_link;
	delete fields.logo_series_link;

	return fields;
}


app.listen(8080,()=>{
	console.log('Listening on port 8080');
})

module.exports = app;
