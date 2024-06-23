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
	openDetails(param){
		this.content.replaceChild(view.details(param));
	},
	openHome(){
		this.content.replaceChild(view.home());
	},
	openNewSeries(){
		this.content.replaceChild(view.new());
	},
	initSearchInput(){
	},
	hashNavMeta:{
		'':'openHome',
		'#Home':'openHome',
		'#Details':'openDetails',
		'#New':'openNewSeries'
	},
	changeState(hash,data=null){
		location.hash = hash;
		this.hashParam = data;
	},
	navigationInitiator(global){
		window.onhashchange = ()=>{
			if(location.hash === '#Refresh')
				return history.back();
			// this.hideAndShow();
			// this.topLayerSetBackground();
			this[this.hashNavMeta[location.hash]](this.hashParam);
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
				return resolve(true);
			}
			alert('Something went wrong getting the data!');
		})
	},
	headerInit(){
		console.log(this.app);
		this.app.onscroll = (e)=>{
			if(this.header.offsetHeight < e.target.scrollTop){
				return	this.header.find('nav').hide();
			}
			this.header.find('nav').show('flex');
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
	},
	get_normalized_home_data(){
		const data = [];
		for(let i in this.home_data.data.series){
			data.push(this.home_data.data.series[i]);
		}
		console.log(data);
		return data;
	}
}

app.init();
