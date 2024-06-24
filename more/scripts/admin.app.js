const app = {
	baseUrl:'http://localhost:8080',
	// baseUrl:'https://topgames-gemasajaas-projects.vercel.app',
	usernameCheckerUrl:'https://api.kitadigital.my.id/api/game',
	body:find('body'),
	development:true,
	app:find('#app'),
	topLayer:find('#toplayer'),
	finderInput:find('#finderInput'),
	content:find('content'),
	leftheader:find('#leftheader'),
	newSeriesButton:find('#newseries'),
	header:find('header'),
	getReqUrl(param){
		return `${this.baseUrl}/${param}`;
	},
	async init(){
		this.openInitLoading();
		this.provideScurities();
		this.navigationInitiator(window);
		this.headerInit();
		await this.getHomeData();
		this.initCategory();
		if(location.hash === '#Home'){
			this.openHome();
		}else location.hash = '#Home';

		this.buttonInits();
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
		document.onkeydown = (e)=>{
			if(!this.development && e.key === 'F12'){
				alert('Galat!!! Akses terbatas!');
				e.preventDefault();	
			}
		}
		//some defense code.
		if(!this.development){
			document.oncontextmenu = (e)=>{
				alert('Galat!!! Akses terbatas!');
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
		this.content.replaceChild(view.details(param));
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
	initSearchInput(){
	},
	hashNavMeta:{
		'':'openHome',
		'#Home':'openHome',
		'#Details':'openDetails',
		'#New':'openNewSeries',
		'#Edit':'openEditSeries'
	},
	changeState(hash,data=null){
		location.hash = hash;
		if(data)
			this.hashParam = data;
	},
	navigationInitiator(global){
		window.onhashchange = ()=>{
			if(location.hash === '#Refresh')
				return history.back();
			// this.hideAndShow();
			// this.topLayerSetBackground();

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
			this.app.scrollTop = 0;
		}
	},
	initCategory(){
		this.leftheader.addChild(view.categories());
	},
	getHomeData(){
		return new Promise(async (resolve,reject)=>{
			const data = await new Promise((resolve,reject)=>{
				cOn.get({
					url:this.getReqUrl('home'),
					onload(){
						resolve(this.getJSONResponse());
					}
				})
			})
			if(data.valid){
				this.home_data = data;

				// handle all for the category
				//this.home_data.data.kategori.Semua = [];
				return resolve(true);
			}
			alert('Something went wrong getting the data!');
		})
	},
	headerInit(){
		this.app.onscroll = (e)=>{
			if(this.header.offsetHeight < e.target.scrollTop){
				return	this.header.find('#categories_section').hide();
			}
			this.header.find('#categories_section').show('flex');
		}
	},
	buttonInits(){
		this.newSeriesButton.onclick = ()=>{
			location.hash = 'New';
		}
		this.finderInput.onchange = ()=>{
			this.handleFinderChangedState();
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
			for(let i in this.home_data.data.series){
				const item = this.home_data.data.series[i];
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

				if(item.kategori.map((x)=>x.toLowerCase()).includes(a.key.toLowerCase())){
					data.push(item);
					is_continue = true;
				}
				if(is_continue)
					continue;

				

			}
			return data;
		}
		
		if(a.filter && a.key !== 'Semua'){

			this.setActiveCategory(null,a.key);


			this.home_data.data.kategori[a.key].forEach((id)=>{
				data.push(this.home_data.data.series[id]);
			})
			return data;
		}
		this.setActiveCategory(null,'Semua');
		for(let i in this.home_data.data.series){
			data.push(this.home_data.data.series[i]);
		}
		return data;
	},
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
			el = this.categoriEls[label];
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
	}
}

app.init();
