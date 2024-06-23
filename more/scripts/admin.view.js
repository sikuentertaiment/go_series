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
	home(){
		const param = app.get_normalized_home_data();
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
			getDisplayLen(){
				const wideList = {
					'0_600':1,
					'601_900':2,
					'901_1024':3,
					'1025':4
				}
				let widevalue;
				for(let i in wideList){
					const wide = i.split('_');
					if(wide.length === 2){
						if(innerWidth >= Number(wide[0]) && innerWidth <= Number(wide[1])){
							widevalue = wideList[i];
							break
						}
					}else if(innerWidth >= Number(wide[0])){
						widevalue = wideList[i];
						break
					}
				}
				return widevalue;
			},
			generateItems(){
				let isTrue = true;
				let index = 0;
				let displayLen = this.getDisplayLen();
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
		                  <img src="${param[index].logo_series}" class=fitimage>
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
		                    <div class=bigone>${param[index].nama}</div>
		                    <div class=smallone>${param[index].small_title}</div>
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
	categories(){
		return makeElement('nav',{
			onadded(){
				this.pushContent();
			},
			pushContent(){
				if(app.home_data.valid){
					for(let i in app.home_data.data.kategori){
						const item = app.home_data.data.kategori[i];
						this.addChild(makeElement('div',{
							innerHTML:i,
							item,
							onadded(){

							}
						}))
					}
				}
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
              	<div style=margin-bottom:20px;display:flex;gap:5px;>
              		<div class=goldbutton style=gap:5px;width:100%;>
	              		<img src=./more/media/editicon.png width=18>
	              		Edit Series
	              	</div>
	              	<div class=goldbutton style=gap:5px;width:100%;>
	              		<img src=./more/media/statsicon.png width=18>
	              		Statistik Series
	              	</div>
              	</div>
                <div style=width:100%;height:300px;border-radius:8px;overflow:hidden;>
                  <img src="${param.banner_series}" class=fitimage>
                </div>
                <div class="titledesc">
                  <div class="imagecard card">
                    <img src="${param.logo_series}" class=fitimage>
                  </div>
                  <div style=width:100%; class="title">
                    <div class=bigtitle>${param.nama}</div>
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
				for(let i in param.keterangan){
					count += 1;
					this.infodrama.addChild(makeElement('div',{
						className:'item',style:`${count === objlen(param.keterangan)?'border-bottom:none;margin-bottom:0;padding-bottom:0;':''}`,
						innerHTML:`
							<div>${i}:</div>
							<div>${param.keterangan[i]}</div>
						`
					}))
				}
			},
			generateCategories(){
				param.kategori.forEach((item)=>{
					this.categories.addChild(makeElement('div',{
						innerHTML:item
					}))
				})
			},
			generateDownloadLinks(){
				this.downloadloading.remove();
				// working batch
				if(!param.link_batch){
					this.batch.addChild(makeElement('div',{
						className:'downloaditem',
						innerHTML:'Link Download Belum Tersedia!'
					}))
				}else{
					param.link_batch.forEach((item,i)=>{
						this.batch.addChild(makeElement('div',{
							className:'downloaditem',
							downloadLink:item.shortenedUrl,
							style:`${i===param.link_batch.length - 1 ? 'border-bottom:none;' : ''}`,
							innerHTML:`
								<div>#${i+1}. ${item.label}</div>
								<div class=downloadbutton id=downloadbutton>
									<img src="./more/media/downloadicon.png">Download
								</div>
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
				// working on per episode
				if(!param.link_episode){
					this.episode.addChild(makeElement('div',{
						className:'downloaditem',
						innerHTML:'Link Download Belum Tersedia!'
					}))
				}else{
					param.link_episode.forEach((item,i)=>{
						this.episode.addChild(makeElement('div',{
							className:'downloaditem',
							style:`${i===param.link_episode.length - 1 ? 'border-bottom:none;' : ''}`,
							downloadLink:item.shortenedUrl,
							innerHTML:`
								<div>#${i+1}. ${item.label}</div>
								<div class=downloadbutton id=downloadbutton>
									<img src="./more/media/downloadicon.png">Download
								</div>
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
			}
		})
	},
	new(){
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
              " class=card><div style=margin-bottom:20px;display:flex;gap:5px;>
              		<div class=goldbutton style=gap:5px;width:100%; id=savebutton>
	              		<img src=./more/media/saveicon.png width=24>
	              		Publish Series
	              	</div>
              	</div>
              	<div class=bold>Tambah Series</div>
              	<div style=margin-top:20px;>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Nama Series</div>
              			<div style=display:flex;>
              				<input id=nama  placeholder="Masukan Nama Series">
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Small Title</div>
              			<div style=display:flex;>
              				<input id=small_title  placeholder="Masukan Small Title Series">
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Sinopsis</div>
              			<div style=display:flex;>
              				<textarea class=child id=sinopsis placeholder="Masukan Sinopsis Series!"></textarea>
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>kategori</div>
              			<div style=display:flex;>
              				<textarea class=child id=kategori placeholder="Pisahkan dengan ','"></textarea>
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Keterangan Series</div>
              			<div style=display:flex;>
              				<textarea class=child id=keterangan placeholder="Masukan Keterangan Series"></textarea>
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Icon Series</div>
              			<div class='child imagepreview' id=image_preview_icon>
              				<img src=./more/media/nopreview.png>
              			</div>
              			<div style=display:flex;>
              				<input type=file accept=image/png id=logo_series>
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Banner Series</div>
              			<div class='child imagepreview' id=image_preview_banner>
              				<img src=./more/media/nopreview.png>
              			</div>
              			<div style=display:flex;>
              				<input type=file accept=image/png id=banner_series>
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:10px;margin-bottom:10px;>
              			<div>Link Batch</div>
              			<div class="linkbox" id=link_box_batch>
              			</div>
              			<div style=display:flex;gap:8px;justify-content:space-between;>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Link</div>
              					<div style=display:flex;width:100%;>
              						<input id=link_batch>
              					</div>
              				</div>
              			</div>
              			<div style=display:flex;gap:8px;justify-content:space-between;>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Label</div>
              					<div style=display:flex;width:100%;>
              						<input id=label_batch>
              					</div>
              				</div>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Encode</div>
              					<div style=display:flex;width:100%;>
              						<select class=child id=encode_batch>
              							<option value=1 selected>YES</option>
              							<option value=0>NO</option>
              						</select>
              					</div>
              				</div>
              				<div class=goldbutton id=new_link_batch>
				                <img src=./more/media/addicon.png style=width:24px;height:24px;>
				                Link Baru
				              </div>
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:10px;margin-bottom:10px;>
              			<div>Link Episode</div>
              			<div class='linkbox' id=link_box_episode>
              			</div>
              			<div style=display:flex;gap:8px;justify-content:space-between;>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Link</div>
              					<div style=display:flex;width:100%;>
              						<input id=link_episode>
              					</div>
              				</div>
              			</div>
              			<div style=display:flex;gap:8px;justify-content:space-between;>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Label</div>
              					<div style=display:flex;width:100%;>
              						<input id=label_episode>
              					</div>
              				</div>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Encode</div>
              					<div style=display:flex;width:100%;>
              						<select class=child id=encode_episode>
              							<option value=1 selected>YES</option>
              							<option value=0>NO</option>
              						</select>
              					</div>
              				</div>
              				<div class=goldbutton id=new_link_episode>
				                <img src=./more/media/addicon.png style=width:24px;height:24px;>
				                Link Baru
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
				if(this.offsetHeight >= app.content.offsetHeight)
					app.content.style.minHeight = 'auto';
				this.newLinkInit('episode');
				this.newLinkInit('batch');
				this.handleImagesFile();

				this.savebutton.onclick = ()=>{
					this.collapseData();
				}
			},
			series_data:{
				nama:null,
				sinopsis:null,
				banner_series:null,
				logo_series:null,
				keterangan:null,
				link_episode:[],
				link_batch:[],
				kategori:null,
				small_title:null
			},
			data_types:{
				small_title:'string',
				nama:'string',
				sinopsis:'string',
				banner_series:'file',
				logo_series:'file',
				keterangan:'JSON',
				kategori:'JSON',
				link_batch:'JSON',
				link_episode:'JSON'
			},
			newLinkInit(state){
				const remove_link_ = (index)=>{
					const new_links = [];
					let removed = false;
					this.series_data[`link_${state}`].forEach((link,i)=>{
						if(i==index){
							removed = true;
							return;
						}
						if(removed){
							link.index -= 1;
						}
						new_links.push(link);
					})
					this.series_data[`link_${state}`] = new_links;
					this[`link_box_${state}`].clear();
					display_link_(new_links);
				}
				const display_link_ = (param)=>{
					param.forEach((item)=>{
						const index = item.index;
						const label = item.label;
						const link = item.link;
						this[`link_box_${state}`].addChild(makeElement('div',{
							style:`padding:10px;background:white;display:flex;
								gap:8px;
							`,
							innerHTML:`
								<div style=display:flex;align-items:center;justify-content:center;min-width:32px;>
									${index+1}.
								</div>
								<div style=width:100%;display:flex;justify-content:center;flex-direction:column;overflow:hidden;>
									<div class="bold bigone">${label}</div>
									<div class=smallone>
										<a href="${link}" target=_blank style=color:gray;font-weight:bold;white-space:nowrap;>${link.slice(0,50)}...</a>
									</div>
								</div>
								<div class=goldbutton class="child" id=delete_link>
									<img src=./more/media/deleteicon.png width=24>
								</div>
							`,
							autoDefine:true,
							onadded(){
								this.delete_link.onclick = ()=>{
									remove_link_(index);
								}
							}
						}))
					})
				}
				this[`new_link_${state}`].onclick = ()=>{
					const label = this[`label_${state}`].value;
					let link = this[`link_${state}`].value;
					const index = this.series_data[`link_${state}`].length;
					const encode = this[`encode_${state}`].value;

					// handle 0 value
					if(!label.length || !link.length || !encode.length)
						return alert('Please fill out the data corectly!!!');


					if(encode==='1')
						link = this.encodeClicksFlyLink(link);
					this.series_data[`link_${state}`].push({link,label,index});
					display_link_([{link,label,index}]);
					this[`link_${state}`].value = '';
					this[`label_${state}`].value = '';
				}
			},
			encodeClicksFlyLink(link){
				const splited = link.split('&');
				try{
					return atob(splited[1].split('=')[1]);
				}catch(e){
					alert('Fail to encode the link, make sure the link is corectly!');
				}
			},
			handleImagesFile(){
				this.banner_series.onchange = ()=>{
					display_image(this.banner_series.files[0],this.image_preview_banner);
				}
				this.logo_series.onchange = ()=>{
					display_image(this.logo_series.files[0],this.image_preview_icon);
				}
				const display_image = (file,el)=>{
					const fs = new FileReader();
					fs.readAsDataURL(file);
					fs.onload = ()=>{
						el.replaceChild(makeElement('img',{
							src:fs.result,
							style:'object-fit:cover;width:100%;height:100%;'
						}))
					}
				}
			},
			collapseData(){
				for(let i in this.data_types){
					const type = this.data_types[i];
					if(type==='string'){
						if(this[i].value.length > 0)
							this.series_data[i] = this[i].value;
					}else if(type==='file'){
						if(this[i].files.length > 0)
							this.series_data[i] = this[i].files[0];
					}else{
						if(i==='keterangan'){
							if(this[i].value.length > 0)
								this.series_data[i] = this.getJSONParsed(this[i].value);
						}else if(i==='kategori'){
							if(this[i].value.length > 0)
								this.series_data[i] = this.getKategoriParsed(this[i].value);
						}
					}
				}
				if(!this.validate())
					return alert('Please fill the data corectly!!!');
				const data_form = this.get_form_data();
				this.upload_(data_form);
			},
			getJSONParsed(param){
				const obj = {};
				const lines = param.split('\n');
				lines.forEach((eq)=>{
					const eqs = eq.split('=');
					if(eqs.length > 1)
						obj[eqs[0]] = eqs[1];
				})
				return obj;
			},
			getKategoriParsed(param){
				return param.split(',');
			},
			validate(){
				let valid = true;
				for(let i in this.series_data){
					if(!this.series_data[i]){
						valid = false;
						break;
					}
				}
				return valid;
			},
			get_form_data(){
				const form_ = new FormData();
				for(let i in this.series_data){
					let value = this.series_data[i];
					if(this.data_types[i] === 'JSON')
						value = JSON.stringify(value);
					form_.append(i,value);
				}
				return form_;
			},
			upload_(param){
				// show the loading indicator
				cOn.post({
					url:app.getReqUrl('newseries'),
					data:param,
					onload(){
						alert(this.getJSONResponse().message);
						app.openNewSeries();
					}
				})
			}
		})
	}
}
