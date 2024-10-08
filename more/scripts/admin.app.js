const app = {
	baseUrl:null,
	body:find('body'),
	development:false,
	app:find('#app'),
	topLayer:find('#toplayer'),
	finderInput:find('#finderInput'),
	content:find('content'),
	header:find('header'),
	footer:find('footer'),
	leftheader:find('#leftheader'),
	newSeriesButton:find('#newseries'),
	header:find('header'),
	is_admin:false,isUseClient:true,
	getReqUrl(param){
		return `${this.baseUrl}/${param}`;
	},
	getReqClientUrl(){
		return `${atob(this.fbclienturl)}`;
	},
	async init(){
		this.openInitLoading();
		this.provideScurities();
		if(!await this.getDynamicServer() || !await this.getHomeData()){
			return this.openErrorPage();
		}
		this.navigationInitiator(window);
		this.headerInit();
		this.initCategory();
		this.initFirstCameUrl();
		this.buttonInits();
		this.initFirebase();
	},
	initFirstCameUrl(){
		this.forcePagingSystem();
	},
	openInitLoading(){
		this.initLoading = this.body.addChild(view.initLoading());
	},
	removeInitLoading(){
		this.initLoading.remove();
	},
	hideAndShow(){
		this.body.style.overflow = 'hidden';
		this.topLayer.show('flex');
	},
	topLayerClose(){
		this.topLayer.hide();
		this.body.style.overflow = 'auto';
	},
	provideScurities(){
		let keys = [];
		document.onkeydown = (e)=>{
			if(!keys.includes(e.key)){
				keys.push(e.key);
			}

			if(keys.toString().search('F12') !== -1)
				return e.preventDefault();
			if(keys.toString().search('Control,Shift,I')!==-1)
				e.preventDefault();
		}
		document.onkeyup = (e)=>{
			keys = keys.filter((key)=>key !== e.key)
		}
		//some defense code.
		if(!this.development){
			document.oncontextmenu = (e)=>{
				// alert('Galat!!! Akses terbatas!');
				e.preventDefault();
			}
		}
	},
	topLayerSetTransparent(){
		this.topLayer.style.background = 'none';
	},
	topLayerSetBackground(){
		this.topLayer.style.background = 'rgb(245 245 249)';
	},
	openDetails(query,param){
		this.content.replaceChild(view.details(query,param));
	},
	openHome(query){
		this.content.replaceChild(view.home(query));
	},
	openNewSeries(){
		this.content.replaceChild(view.new());
	},
	openEditSeries(){
		this.content.replaceChild(view.edit());
	},
	openMoreInfo(){
		this.content.replaceChild(view.moreinfo());
	},
	openEditWebInformation(){
		this.content.replaceChild(view.editwebinformation());
	},
	openBrokenLinkPage(){
		this.content.replaceChild(view.brokenreportpage());
	},
	initSearchInput(){
	},
	hashNavMeta:{
		'':'openHome',
		'#Home':'openHome',
		'#Details':'openDetails',
		'#New':'openNewSeries',
		'#Edit':'openEditSeries',
		'#Info':'openMoreInfo',
		'#Editwebinformation':'openEditWebInformation',
		'#Reportbroken':'openBrokenLinkPage'
	},
	changeState(hash,data=null){
		location.hash = hash;
		if(data)
			this.hashParam = data;
	},
	forcePagingSystem(){
		// implementing paramater
		let hash = location.hash;
		const query = {};
		if(location.hash.indexOf('?')!==-1){
			const splitedhash = location.hash.split('?');
			const queries = splitedhash[1].split('&');
			queries.forEach((q)=>{
				const v = q.split('=');
				if(v.length===2){
					v[1] = this.queryValueTypeHandler(v[1]);
					query[v[0]] = v[1];
				}
			})
			hash = splitedhash[0];
		}

		this[this.hashNavMeta[hash]](query,this.hashParam);
		this.handleContentHeight();
		this.removeInitLoading();
		this.app.scrollTop = 0;
	},
	isRefresh:false,
	navigationInitiator(global){
		window.onhashchange = ()=>{
			if(location.hash === '#Refresh'){
				this.isRefresh = true;
				return history.back();
			}
			isRefresh = false;
			this.forcePagingSystem();
		}
	},
	initCategory(){
		this.leftheader.addChild(view.categories());
	},
	getDynamicServer(){
		return new Promise(async (resolve,reject)=>{
			if(this.isUseClient)
				return resolve(true)
			const data = await new Promise((resolve,reject)=>{
				cOn.get({url:atob(this.fburl),
					onload(){
						resolve(this.getJSONResponse());
					},
					onerror(){
						resolve(false);
					}
				});	
			})
			if(!data)
				return resolve(false)
			this.baseUrl = data;
			resolve(true);
		})
	},
	getHomeData(){
		if(this.isUseClient){
			return new Promise(async(resolve,reject)=>{
				const data = await new Promise((resolve,reject)=>{
					cOn.get({
						url:this.getReqClientUrl(),
						onload(){
							resolve({valid:true,data:this.getJSONResponse()});
						},
						onerror(){
							resolve({valid:false});
						}
					})
				})
				if(data.valid){
					this.home_data = this.timeProcessData(data);
					// handle all for the category
					//this.home_data.data.kategori.Semua = [];
					return resolve(true);
				}
				resolve(false)
			})
		}
		return new Promise(async (resolve,reject)=>{
			const data = await new Promise((resolve,reject)=>{
				cOn.get({
					url:this.getReqUrl('home'),
					onload(){
						resolve(this.getJSONResponse());
					},
					onerror(){
						resolve({valid:false});
					}
				})
			})
			if(data.valid){
				this.home_data = this.timeProcessData(data);
				// handle all for the category
				//this.home_data.data.kategori.Semua = [];
				return resolve(true);
			}
			resolve(false)
		})
	},
	headerInit(){
		this.app.onscroll = (e)=>{
			if(this.header.offsetHeight < e.target.scrollTop){
				if(innerWidth < 1258){
					if(this.header.offsetHeight < e.target.scrollTop){
						this.header.find('.icon').hide();
					}
				}
				return	this.header.find('#categories_section').hide();
			}
			this.header.find('#categories_section').show('flex');
			if(innerWidth < 1258){
				this.header.find('.icon').show();
			}
		}
		if(this.is_admin)
			this.header.find('.icon').findall('div')[1].innerText = 'Admin Panel';
	},
	buttonInits(){
		this.newSeriesButton.onclick = ()=>{
			location.hash = 'New';
		}
		if(!this.is_admin)
			this.newSeriesButton.remove();
		else this.newSeriesButton.show('flex');
		this.finderInput.onchange = ()=>{
			this.handleFinderChangedState();
		}
		this.finderInput.onclick = ()=>{
			this.finderInput.value = '';
		}
	},
	handleFinderChangedState(){
		const query = this.finderInput.value;
		this.changeState(`Home?search=1&key=${query}`);
	},
	get_normalized_home_data(a={filter:0,key:''}){
		const data = [];

		if(a.search && a.key){
			this.setActiveCategory(null,'Semua');
			for(let i of this.home_data.data.series_index){
				const item = Object.assign(this.home_data.data.series[i],{series_id:i});
				let is_continue = false;
				for(let i of ['nama','sinopsis','small_title']){
					if(item[i].toLowerCase().indexOf(decodeURIComponent(a.key).toLowerCase())!==-1){
						data.push(item);
						is_continue = true;
						break;
					}	
				}
				if(is_continue)
					continue;

				if(item.kategori && item.kategori.map((x)=>x.toLowerCase()).includes(decodeURIComponent(a.key).toLowerCase())){
					data.push(item);
					is_continue = true;
				}
				if(is_continue)
					continue;

				for(let i in item.keterangan){
					if(item.keterangan[i].toLowerCase().indexOf(decodeURIComponent(a.key).toLowerCase())!==-1){
						data.push(item);
						break;
					}
				}

			}
			return data;
		}
		
		if(a.filter && a.key !== 'Semua'){
			this.setActiveCategory(null,a.key);
			this.home_data.data.kategori[decodeURIComponent(a.key)].forEach((id)=>{
				data.push(Object.assign(this.home_data.data.series[id],{series_id:id}));
			})
			return data;
		}
		this.setActiveCategory(null,'Semua');
		for(let i of this.home_data.data.series_index){
			data.push(Object.assign(this.home_data.data.series[i],{series_id:i}));
		}
		return data;
	},fburl:'aHR0cHM6Ly93YXJ1bmdrdXByb2plY3QtNDVhMjgtZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcC9zZXJ2ZXIuanNvbg==',
	fbclienturl:'aHR0cHM6Ly93YXJ1bmdrdXByb2plY3QtNDVhMjgtZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcC8uanNvbg==',
	fbconfig:'eyJhcGlLZXkiOiJBSXphU3lERV9VWmlrb1N4NlVoOUJjNlp3bl92MjFIMEhMLTBpTTgiLCJhdXRoRG9tYWluIjoid2FydW5na3Vwcm9qZWN0LTQ1YTI4LmZpcmViYXNlYXBwLmNvbSIsImRhdGFiYXNlVVJMIjoiaHR0cHM6Ly93YXJ1bmdrdXByb2plY3QtNDVhMjgtZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcCIsInByb2plY3RJZCI6IndhcnVuZ2t1cHJvamVjdC00NWEyOCIsInN0b3JhZ2VCdWNrZXQiOiJ3YXJ1bmdrdXByb2plY3QtNDVhMjguYXBwc3BvdC5jb20iLCJtZXNzYWdpbmdTZW5kZXJJZCI6IjQ5ODExMDk0MTAzMiIsImFwcElkIjoiMTo0OTgxMTA5NDEwMzI6d2ViOmM5ZDU0MjIyZGYzZDM5NjAzMDM4ZGQiLCJtZWFzdXJlbWVudElkIjoiRy1YMUgwQjRNWEVRIn0=',
	queryValueTypeHandler(param){
		// handling type number
		if(!isNaN(param)){
			return Number(param);
		}
		// type boolean
		if(param==='false'){
			return 0;
		}else if(param==='true')
			return 1;

		return param;
	},
	setActiveCategory(el=null,label=''){
		if(!el)
			el = this.categoriEls[decodeURIComponent(label)];
		if(this.activeCategory)
			this.activeCategory.classList.remove('activecategory');
		el.classList.add('activecategory');
		this.activeCategory = el;
	},
	categoriEls:{},
	kategoriToString(){
		let string = '';
		const keys = Object.keys(this.hashParam.keterangan);
		let index = 0;
		for(let i of keys){
			string += `${i}=${this.hashParam.keterangan[i]}${index!==keys.length-1?'\n':''}`;
			index += 1;
		}
		return string;
	},
	handleContentHeight(){
  	if(innerHeight <= this.footer.offsetHeight+this.content.offsetHeight+this.footer.offsetHeight){
			this.content.style.height = 'auto';
		}else this.content.style.height = '100%';
	},
	timeProcessData(data){
		const monthsMapping = {
		  'Januari': 'January',
		  'Februari': 'February',
		  'Maret': 'March',
		  'April': 'April',
		  'Mei': 'May',
		  'Juni': 'June',
		  'Juli': 'July',
		  'Agustus': 'August',
		  'September': 'September',
		  'Oktober': 'October',
		  'November': 'November',
		  'Desember': 'December'
		};
		const daysMapping = {
		  'Minggu': 'Sunday',
		  'Senin': 'Monday',
		  'Selasa': 'Tuesday',
		  'Rabu': 'Wednesday',
		  'Kamis': 'Thursday',
		  'Jumat': 'Friday',
		  'Sabtu': 'Saturday'
		};
		const index = Object.keys(data.data.series);
		index.sort((a,b)=>{
			let a_last_edit = data.data.series[a].last_edit;
			let b_last_edit = data.data.series[b].last_edit;

			a_last_edit = Date.parse(a_last_edit.replaceAll('.', ':'));
			b_last_edit = Date.parse(b_last_edit.replaceAll('.', ':'));

			data.data.series[a].last_edit_stamp = a_last_edit;
			data.data.series[b].last_edit_stamp = b_last_edit;

			if(a_last_edit > b_last_edit)
				return -1;
			else if(a_last_edit < b_last_edit)
				return 1;
			else
				return 0;
		})
		data.data.series_index = index;
		return data;
	},
	openErrorPage(){
		this.body.replaceChild(view.server404());
	},
	donation:{
		saweria:'https://saweria.co/goseries',
		trakteer:'https://trakteer.id/goseries'
	},
	imageErrorHandler(image){
		if(!image.isRefreshed){
			if(!image.errLoop)
				image.errLoop = 10;
			image.errLoop -= 1;
			let subdomain = image.src.indexOf('/tv');
			let isError = false;
			if(subdomain === -1)
				isError = true;
			else{
				subdomain = image.src.slice(subdomain + 1, subdomain+4);
				const newImageUrl = image.src.replace(subdomain,`tv${image.errLoop}`);
				image.src = newImageUrl;
			}
			console.clear();
			if(image.errLoop === 1 || isError){
				image.src = './more/media/error_image_.webp';
				image.isRefreshed = true;
			}
		}
	},
	getConfig(){
		return JSON.parse(atob(this.fbconfig));
	},
	initFirebase(){
		this.fapp = firebase.init(this.getConfig());
		this.fanalytics = firebase.analytics(this.fapp);
	}
}

app.init();
