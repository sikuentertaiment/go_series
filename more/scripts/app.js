const app = {
	// baseUrl:'http://localhost:8080',
	baseUrl:'https://topgames-gemasajaas-projects.vercel.app',
	usernameCheckerUrl:'https://api.kitadigital.my.id/api/game',
	body:find('body'),
	development:true,
	app:find('#app'),
	topLayer:find('#toplayer'),
	finderInput:find('#finderInput'),
	content:find('content'),
	leftheader:find('#leftheader'),
	header:find('header'),
	async init(){
		this.openInitLoading();
		this.provideScurities();
		this.navigationInitiator(window);
		this.headerInit();
		this.initCategory();
		if(location.hash === '#Home'){
			this.openHome();
		}else location.hash = '#Home';
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
	initSearchInput(){
	},
	hashNavMeta:{
		'':'openHome',
		'#Home':'openHome',
		'#Details':'openDetails'
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
	headerInit(){
		this.app.onscroll = (e)=>{
			if(this.header.offsetHeight < e.target.scrollTop){
				return	this.header.find('nav').hide();
			}
			this.header.find('nav').show('flex');
		}
	}
}

app.init();
