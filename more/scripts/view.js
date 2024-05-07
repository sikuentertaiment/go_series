const view = {
	initLoading(){
		return makeElement('div',{
			id:'initLoading',
			style:`
				background:#f5f5f5eb;
				position:fixed;
				display:flex;justify-content:center;
				align-items:center; 
				top:0;left:0;width:100%;height:100%;z-index:20;
				flex-direction:column;
				gap:20px;
			`,
			innerHTML:`
				<div style=opacity:.1;>
					<img src=./more/media/initloading.gif>
				</div>
				<div style="
					font-weight:bold;color:gray;
				">Mohon Tunggu...</div>
			`
		})
	},
	home(param){
		param = [
			{
				thumbnail:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				title:'Remember When',
				smallTitle:'2024, 12 eps',
				infoDrama:{
					Judul:'Remember When',
					Sutradara:'Kin Shin Tae',
					Rating:'4/6',
					Asal:'Korsel',
					Publisher:'Netflix',
					'Jumlah Episode':'14 Episode'
				},
				bannerImg:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				imgCardSrc:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				sinopsis:'Ada seorang laki laki',
				downloadLinks:{
					batchs:[['Eps 1-end','fakelink']],
					episodes:[['Eps 1: the batle of singkuang','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink']]
				},
				categories:['Romance','Trending','Latest','Action','Kin Ji Seok']
			},
			{
				thumbnail:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				title:'Remember When',
				smallTitle:'2024, 12 eps',
				infoDrama:{
					Judul:'Remember When',
					Sutradara:'Kin Shin Tae',
					Rating:'4/6',
					Asal:'Korsel',
					Publisher:'Netflix',
					'Jumlah Episode':'14 Episode'
				},
				bannerImg:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				imgCardSrc:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				sinopsis:'Ada seorang laki laki',
				downloadLinks:{
					batchs:[['Eps 1-end','fakelink']],
					episodes:[['Eps 1: the batle of singkuang','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink']]
				},
				categories:['Romance','Trending','Latest','Action','Kin Ji Seok']
			},
			{
				thumbnail:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				title:'Remember When',
				smallTitle:'2024, 12 eps',
				infoDrama:{
					Judul:'Remember When',
					Sutradara:'Kin Shin Tae',
					Rating:'4/6',
					Asal:'Korsel',
					Publisher:'Netflix',
					'Jumlah Episode':'14 Episode'
				},
				bannerImg:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				imgCardSrc:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				sinopsis:'Ada seorang laki laki',
				downloadLinks:{
					batchs:[['Eps 1-end','fakelink']],
					episodes:[['Eps 1: the batle of singkuang','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink']]
				},
				categories:['Romance','Trending','Latest','Action','Kin Ji Seok']
			},
			{
				thumbnail:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				title:'Remember When',
				smallTitle:'2024, 12 eps',
				infoDrama:{
					Judul:'Remember When',
					Sutradara:'Kin Shin Tae',
					Rating:'4/6',
					Asal:'Korsel',
					Publisher:'Netflix',
					'Jumlah Episode':'14 Episode'
				},
				bannerImg:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				imgCardSrc:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				sinopsis:'Ada seorang laki laki',
				downloadLinks:{
					batchs:[['Eps 1-end','fakelink']],
					episodes:[['Eps 1: the batle of singkuang','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink']]
				},
				categories:['Romance','Trending','Latest','Action','Kin Ji Seok']
			},
			{
				thumbnail:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				title:'Remember When',
				smallTitle:'2024, 12 eps',
				infoDrama:{
					Judul:'Remember When',
					Sutradara:'Kin Shin Tae',
					Rating:'4/6',
					Asal:'Korsel',
					Publisher:'Netflix',
					'Jumlah Episode':'14 Episode'
				},
				bannerImg:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				imgCardSrc:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				sinopsis:'Ada seorang laki laki',
				downloadLinks:{
					batchs:[['Eps 1-end','fakelink']],
					episodes:[['Eps 1: the batle of singkuang','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink']]
				},
				categories:['Romance','Trending','Latest','Action','Kin Ji Seok']
			},
			{
				thumbnail:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				title:'Remember When',
				smallTitle:'2024, 12 eps',
				infoDrama:{
					Judul:'Remember When',
					Sutradara:'Kin Shin Tae',
					Rating:'4/6',
					Asal:'Korsel',
					Publisher:'Netflix',
					'Jumlah Episode':'14 Episode'
				},
				bannerImg:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				imgCardSrc:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				sinopsis:'Ada seorang laki laki',
				downloadLinks:{
					batchs:[['Eps 1-end','fakelink']],
					episodes:[['Eps 1: the batle of singkuang','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink']]
				},
				categories:['Romance','Trending','Latest','Action','Kin Ji Seok']
			},
			{
				thumbnail:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				title:'Remember When',
				smallTitle:'2024, 12 eps',
				infoDrama:{
					Judul:'Remember When',
					Sutradara:'Kin Shin Tae',
					Rating:'4/6',
					Asal:'Korsel',
					Publisher:'Netflix',
					'Jumlah Episode':'14 Episode'
				},
				bannerImg:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				imgCardSrc:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				sinopsis:'Ada seorang laki laki',
				downloadLinks:{
					batchs:[['Eps 1-end','fakelink']],
					episodes:[['Eps 1: the batle of singkuang','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink']]
				},
				categories:['Romance','Trending','Latest','Action','Kin Ji Seok']
			},
			{
				thumbnail:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				title:'Remember When',
				smallTitle:'2024, 12 eps',
				infoDrama:{
					Judul:'Remember When',
					Sutradara:'Kin Shin Tae',
					Rating:'4/6',
					Asal:'Korsel',
					Publisher:'Netflix',
					'Jumlah Episode':'14 Episode'
				},
				bannerImg:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				imgCardSrc:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				sinopsis:'Ada seorang laki laki',
				downloadLinks:{
					batchs:[['Eps 1-end','fakelink']],
					episodes:[['Eps 1: the batle of singkuang','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink']]
				},
				categories:['Romance','Trending','Latest','Action','Kin Ji Seok']
			},
			{
				thumbnail:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				title:'Remember When',
				smallTitle:'2024, 12 eps',
				infoDrama:{
					Judul:'Remember When',
					Sutradara:'Kin Shin Tae',
					Rating:'4/6',
					Asal:'Korsel',
					Publisher:'Netflix',
					'Jumlah Episode':'14 Episode'
				},
				bannerImg:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				imgCardSrc:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				sinopsis:'Ada seorang laki laki',
				downloadLinks:{
					batchs:[['Eps 1-end','fakelink']],
					episodes:[['Eps 1: the batle of singkuang','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink']]
				},
				categories:['Romance','Trending','Latest','Action','Kin Ji Seok']
			},
			{
				thumbnail:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				title:'Remember When',
				smallTitle:'2024, 12 eps',
				infoDrama:{
					Judul:'Remember When',
					Sutradara:'Kin Shin Tae',
					Rating:'4/6',
					Asal:'Korsel',
					Publisher:'Netflix',
					'Jumlah Episode':'14 Episode'
				},
				bannerImg:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				imgCardSrc:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				sinopsis:'Ada seorang laki laki',
				downloadLinks:{
					batchs:[['Eps 1-end','fakelink']],
					episodes:[['Eps 1: the batle of singkuang','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink']]
				},
				categories:['Romance','Trending','Latest','Action','Kin Ji Seok']
			},
			{
				thumbnail:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				title:'Remember When',
				smallTitle:'2024, 12 eps',
				infoDrama:{
					Judul:'Remember When',
					Sutradara:'Kin Shin Tae',
					Rating:'4/6',
					Asal:'Korsel',
					Publisher:'Netflix',
					'Jumlah Episode':'14 Episode'
				},
				bannerImg:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				imgCardSrc:'https://akcdn.detik.net.id/visual/2021/06/18/nevertheless-2_43.jpeg?w=720&q=90',
				sinopsis:'Ada seorang laki laki',
				downloadLinks:{
					batchs:[['Eps 1-end','fakelink']],
					episodes:[['Eps 1: the batle of singkuang','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink'],['Eps 1','fakelink']]
				},
				categories:['Romance','Trending','Latest','Action','Kin Ji Seok']
			}
		];
		return makeElement('div',{
			className:'showcase',
			onadded(){
				this.generateItems();
				if(this.offsetHeight >= app.content.offsetHeight || app.content.isMinHeightAuto){
					app.content.style.minHeight = 'auto';
					app.content.isMinHeightAuto = true;
				}else app.content.style.minHeight = '100%';
				app.removeInitLoading();
			},
			generateItems(){
				let isTrue = true;
				let index = 0;
				let displayLen = 3;
				let maxloopx = Math.ceil(param.length/displayLen);
				for(let j=0;j<maxloopx;j++){
					this.addChild(makeElement('div',{
						className:'container',
						innerHTML:`
							<div class=seperator></div>
							<div style=width:100%;>
								<div class=content id=content></div>
							</div>
						`,
						autoDefine:true,
						onadded(){
							this.generateContent();
						},
						generateContent(){
							const Left = param.length-index;
							const maxloop = (Left>displayLen)?displayLen:Left;
							const calculatedWidth = (this.content.offsetWidth - (10 * (displayLen - 1)))/displayLen;
							for(let i=0;i<maxloop;i++){
								this.content.addChild(makeElement('div',{
									data:param[index],
									className:'parent',
									style:`max-width:${calculatedWidth}px;min-width:${calculatedWidth}px;`,
									innerHTML:`
										<div style=width:100%;height:250px;overflow:hidden;opacity:.8;>
		                  <img src="${param[index].thumbnail}" class=fitimage>
		                </div>
		                <div class=background></div>
		                <div style="
		                  position: absolute;
		                  top: 0;
		                  left: 0;
		                  width: 100%;
		                  height: 100%;
		                  display: flex;
		                  flex-direction: column;
		                  justify-content: flex-end;
		                ">
		                  <div style=padding:10px;color:white;>
		                    <div class=bigone>${param[index].title}</div>
		                    <div class=smallone>${param[index].smallTitle}</div>
		                  </div>
		                </div>
									`,
									onclick(){
										app.changeState('Details',this.data);
									}
								}))
								index += 1;
							}
						}
					}))
				}
			}
		})
	},
	categories(param){
		param = ['Beranda','Romance'];
		return makeElement('nav',{
			onadded(){
				this.pushContent();
			},
			pushContent(){
				param.forEach((item)=>{
					this.addChild(makeElement('div',{
						innerHTML:item,
						item,
						onadded(){
							console.log(this.item);
						}
					}))
				})
			}
		})
	},
	details(param){
		return makeElement('div',{
			className:'detail',
			innerHTML:`
				<div class=container>
          <div class=seperator></div>
          <div style=width:100%;>
            <div style='display: flex;' class=width50>
              <div style="
                padding: 20px;
                background: white;
                border-radius: 8px;
                width: 100%;
                border: 1px solid gainsboro;
              " class=card>
                <div style=width:100%;height:300px;>
                  <img src="${param.bannerImg}" class=fitimage>
                </div>
                <div class="titledesc">
                  <div class="imagecard card">
                    <img src="${param.imgCardSrc}" class=fitimage>
                  </div>
                  <div style=width:100%; class="title">
                    <div class=bigtitle>${param.title}</div>
                    <div class=category id=categories></div>
                  </div>
                </div>
                <div class=sinopsis style=padding:20px;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                  ">
                    <div style="
                        max-width: 100px;
                        min-width: 100px;
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                    "># Sinopsis</div>
                    <div class=line></div>
                  </div>
                  <div style="padding:20px;background:whitesmoke;border:1px solid gainsboro;border-radius: 10px;">${param.sinopsis}</div>
                </div>
                <div class=sinopsis style=padding:20px;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                  ">
                    <div style="
                        max-width: 150px;
                        min-width: 150px;
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                    "># Details Series</div>
                    <div class=line></div>
                  </div>
                  <div class=info style="padding:20px;background:whitesmoke;border:1px solid gainsboro;border-radius: 10px;" id=infodrama></div>
                </div>
                <div class=sinopsis style=padding:20px;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                  ">
                    <div style="
                        max-width: 100px;
                        min-width: 100px;
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                    "># Download</div>
                    <div class=line></div>
                  </div>
                  <div>
                    <div class=downloadmenu id=downloadmenu>
                    	<div class=active value=batch>Batch</div>
                    	<div value='episode'>Episode</div>
                    </div>
                    <div class=downloadbody>
                    	<div id=batch style=display:none;></div>
	                    <div id=episode style=display:none;></div>
	                    <div id=downloadloading>
	                    	<div class=smallopacity>
	                    		<img src=./more/media/initloading.gif>
	                    	</div>
	                    	<div>Sedang Memuat...</div>
	                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
			`,
			autoDefine:true,
			onadded(){
				this.generateCategories();
				this.generateInfo();
				this.initDownloadMenuNav();
				this.generateDownloadLinks();
				if(this.offsetHeight >= app.content.offsetHeight)
					app.content.style.minHeight = 'auto';
				app.removeInitLoading();
			},
			initDownloadMenuNav(){
				const divs = this.downloadmenu.findall('div');
				divs.forEach((div)=>{
					div.onclick = ()=>{
						if(this.activeDownloadNav){
							this.activeDownloadNav.style.background = 'gainsboro';
							div.style.background = '#00b5ff';
							this.activeDownloadNav = div;
						}else{
							this.activeDownloadNav = div;
							div.style.background = '#00b5ff';
						}
						const scene = div.getAttribute('value');
						this[scene].show('block');
						this[scene==='batch'?'episode':'batch'].hide();
					}
				})
				divs[0].click();
			},
			generateInfo(){
				let count = 0;
				for(let i in param.infoDrama){
					count += 1;
					this.infodrama.addChild(makeElement('div',{
						className:'item',style:`${count === objlen(param.infoDrama)?'border-bottom:none;margin-bottom:0;padding-bottom:0;':''}`,
						innerHTML:`
							<div>${i}:</div>
							<div>${param.infoDrama[i]}</div>
						`
					}))
				}
			},
			generateCategories(){
				param.categories.forEach((item)=>{
					this.categories.addChild(makeElement('div',{
						innerHTML:item
					}))
				})
			},
			generateDownloadLinks(){
				this.downloadloading.remove();
				// working batch
				param.downloadLinks.batchs.forEach((item,i)=>{
					this.batch.addChild(makeElement('div',{
						className:'downloaditem',
						downloadLink:item[1],
						style:`${i===param.downloadLinks.batchs.length - 1 ? 'border-bottom:none;' : ''}`,
						innerHTML:`
							<div>#${i+1}. ${item[0]}</div>
							<div class=downloadbutton id=downloadbutton>Download</div>
						`,
						autoDefine:true,
						onadded(){
							this.downloadbutton.onclick = ()=>{
								this.openDownload();
							}
						},
						openDownload(){
							console.log(this.downloadLink);
						}
					}))
				})
				// working on per episode
				param.downloadLinks.episodes.forEach((item,i)=>{
					this.episode.addChild(makeElement('div',{
						className:'downloaditem',
						style:`${i===param.downloadLinks.episodes.length - 1 ? 'border-bottom:none;' : ''}`,
						downloadLink:item[1],
						innerHTML:`
							<div>#${i+1}. ${item[0]}</div>
							<div class=downloadbutton id=downloadbutton>Download</div>
						`,
						autoDefine:true,
						onadded(){
							this.downloadbutton.onclick = ()=>{
								this.openDownload();
							}
						},
						openDownload(){
							console.log(this.downloadLink);
						}
					}))
				})
			}
		})
	}
}
