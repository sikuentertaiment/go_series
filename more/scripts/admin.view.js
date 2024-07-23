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
	home(a){
		const param_data = app.get_normalized_home_data(a);
		return makeElement('div',{
			className:'showcase',
			onadded(){
				this.handlePagination();
				this.generateItems();
				if(innerHeight > app.footer.offsetHeight+app.content.offsetHeight+app.footer.offsetHeight){
					const height = app.content.offsetHeight - app.content.find('.showcase').offsetHeight;
					console.log(app.content.offsetHeight,app.content.find('.showcase').offsetHeight);
				}
				console.log('called');
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
				this.clear();
				let isTrue = true;
				let index = 0;
				let displayLen = this.getDisplayLen();
				console.log(this.pageState);
				const param = this.usePage?this.pagebydata[this.pageState]:param_data;
				console.log(this.pagebydata[this.pageState]);
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
										<div style=width:100%;height:250px;overflow:hidden;>
		                  <img src="${param[index].logo_series}" class="fitimage child" id=logo loading=lazy>
		                </div>
		                <div class=background></div>
		                <div class=background style=background:none;opacity:1; id=stuffs></div>
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
		                  <div style=padding:10px;color:white;background:#00000087;>
		                    <div class=bigone>${param[index].nama}</div>
		                    <div class=smallone>${param[index].keterangan['Updated on'] ? param[index].keterangan['Updated on'] : param[index].keterangan['Released on'] ? param[index].keterangan['Released on'] : param[index].keterangan['Released'] ? param[index].keterangan['Released'] : '-'}, ${param[index].keterangan['Status']}</div>
		                  </div>
		                </div>
									`,
									autoDefine:true,
									onadded(){
										this.logo.onerror = ()=>{
											app.imageErrorHandler(this.logo);
										}
										this.pushHotLabel();
									},
									onclick(){
										app.changeState('Details',this.data);
									},
									pushHotLabel(){
										if(new Date().getTime() - this.data.last_edit_stamp < 86400000){
											this.stuffs.addChild(makeElement('div',{
												style:`
													width: 32px;
											    height: 32px;
											    padding: 5px;
											    background: whitesmoke;
											    border-radius: 50%;
											    margin: 5px;
												`,
												innerHTML:`
													<img src=./more/media/hotupdate.png class=fitimage>
												`
											}))
										}
									}
								}))
								index += 1;
							}
						}
					}))
				}
				if(!index)
					this.addChild(makeElement('div',{
						className:'container',
						innerHTML:`
							<div class=seperator></div>
							<div style=width:100%;>
								<div class=content id=content>
									<div style="
										width:100%;
										height:100%;
										display:flex;
										justify-content:center;
									">Data belum tersedia!</div>
								</div>
							</div>
						`
					}))
				if(this.usePage){
					this.addChild(makeElement('div',{
						className:'container',style:'height:100%;min-height:0px;margin-top:10px;',
						innerHTML:`
							<div class=seperator></div>
							<div style=width:100%;display:flex;align-items:flex-end; id=cccc>
								<div class=content id=content>
									<div style="
										width: 100%;
								    height: 100%;
								    display: flex;
								    justify-content: center;
								    gap: 10px;
								    align-items:center;
									" id=page_parent>
										<div class=goldbutton id=prev style=background:whitesmoke;border:none;box-shadow:none;${!this.pageState?'opacity:0;cursor:unset;':''}>
											<img src=./more/media/expand.png style=transform:rotate(90deg);width:24px;height:24px;>
										</div>
										<div>Page ${this.pageState+1} Of ${this.pageLength}</div>
										<div class=goldbutton id=next style=background:whitesmoke;border:none;box-shadow:none;${this.pageState===this.pageLength-1?'opacity:0;cursor:unset;':''}>
											<img src=./more/media/expand.png style=transform:rotate(-90deg);width:24px;height:24px;>
										</div>
									</div>
								</div>
							</div>
						`,
						autoDefine:true,
						onadded(){
							this.prev.onclick = ()=>{
								if(!this.parent.pageState)
									return
								this.parent.prev_page();
							}
							this.next.onclick = ()=>{
								if(this.parent.pageState===this.parent.pageLength-1)
									return
								this.parent.next_page();
							}
						}
					}))
				}
			},
			handlePagination(){
				const pageContentLength = 12;
				const pageLength = Math.ceil(param_data.length/pageContentLength);
				const pagebydata = [];
				if(pageLength > 1){
					this.usePage = true;
					this.pageState = 0;
					this.pageLength = pageLength;
					for(let i=0;i<pageLength;i++){
						const start = i*pageContentLength;
						const end = ((i+1)*pageContentLength);
						pagebydata.push(param_data.slice(start,end));
					}
				}
				this.pagebydata = pagebydata;
			},
			next_page(){
				this.pageState += 1;
				this.generateItems();
				app.handleContentHeight();
			},
			prev_page(){
				this.pageState -= 1;
				this.generateItems();
				app.handleContentHeight();
			}
		})
	},
	categories(){
		return makeElement('div',{
			id:'categories_section',
			style:'display:flex;gap:12px;align-items:center;',
			className:'width50',
			innerHTML:`
				<nav class=child id=nav></nav>
				<div style=width:32px;height:32px;min-width:32px; class=moremenu id=moremenubutton>
					<img src=./more/media/moreinfoicon.png class=fitimage>
				</div>
			`,
			autoDefine:true,
			onadded(){
				this.pushContent();
				app.moreinfobutton = this.moremenubutton;
				this.moremenubutton.onclick = ()=>{
					app.changeState('Info');
					app.setActiveCategory(this.moremenubutton);
				}
			},
			pushContent(){
				if(app.home_data.valid){
					const cc = ['Semua'].concat(Object.keys(app.home_data.data.kategori));
					for(let i of cc){
						const item = app.home_data.data.kategori[i];
						app.categoriEls[i] = this.nav.addChild(makeElement('div',{
							innerHTML:i,
							style:'white-space:nowrap;',
							item,
							onclick(){
								app.setActiveCategory(this);
								app.changeState(`Home?filter=1&key=${i}`,this.item);
							},
							onadded(){
								if(i==='Semua')
									app.setActiveCategory(this);
							}
						}))
					}
				}
			}
		})
	},
	details(query,param){
		if(!query.series_id && !param)
			return app.changeState('Home');
		if(query.series_id){
			param = app.home_data.data.series[query.series_id];
			app.hashParam = param;
		}
		return makeElement('div',{
			className:'detail',
			innerHTML:`
				<div class=container>
          <div class=seperator></div>
          <div style=width:100%;>
            <div style='display: flex;' class=width50>
              <div style="
                background: white;
                border-radius: 8px;
                width: 100%;
              " class=card>
              	<div style=display:${app.is_admin?'flex':'none'};gap:5px;margin:20px;margin-bottom:0;overflow:auto;>
              		<div class=goldbutton style=gap:5px;width:100%; id=edit_series>
	              		<img src=./more/media/editicon.png width=18>
	              		Edit Series
	              	</div>
	              	<div class=goldbutton style=gap:5px;width:100%; id=statistik_series>
	              		<img src=./more/media/statsicon.png width=18>
	              		Statistik Series
	              	</div>
	              	<div class=goldbutton style=gap:5px;width:100%; id=delete_series>
	              		<img src=./more/media/deleteicon.png width=18>
	              		Hapus Series
	              	</div>
              	</div>
                <div style="height:300px;border-radius:8px;overflow:hidden;margin:20px;margin-bottom:0px;background:whitesmoke;">
                  <img src="${param.banner_series}" class="fitimage child" style="border-radius:8px;" id=banner_image>
                </div>
                <div class="titledesc">
                  <div class="imagecard card">
                    <img src="${param.logo_series}" class="fitimage child" style=background:whitesmoke; id=logo_image>
                  </div>
                  <div style=width:100%; class="title">
                    <div class=bigtitle>${param.nama}</div>
                    <div class=category id=categories></div>
                    <div class=share>
                    	<div class="bold smallone" style="padding-bottom:7.5px;border-bottom:1px dotted gainsboro;">Bagikan Series Ini Ke Temanmu!</div>
                    	<div style=display:flex;gap:5px;flex-wrap:wrap; class=shareitem>
                    		<div class=box id=copyurl style=white-space:nowrap;>
	                    		<div>
	                    			<img src=./more/media/shareurl.png class=fitimage>
	                    		</div>
	                    		Salin Url
                    		</div>
                    		<div class=box id=sharetowa>
	                    		<div>
	                    			<img src=./more/media/sharewaicon.png class=fitimage>
	                    		</div>
	                    		Whatsapp
	                    	</div>
	                    	<div class=box id=sharetotele>
	                    		<div>
	                    			<img src=./more/media/shareteleicon.png class=fitimage>
	                    		</div>
	                    		Telegram
	                    	</div>
                    	</div>
                    </div>
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
                  <div>${param.sinopsis}</div>
                </div>
                <div class=sinopsis style=padding:20px;padding-top:0;>
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
                  <div class=info id=infodrama></div>
                </div>
                <div class=sinopsis style=padding:20px;padding-top:0;>
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
                    "># Streaming Online</div>
                    <div class=line></div>
                  </div>
                  <div class=info id=onlinestreaming>
                  	<div style="width:100%;height:315px;max-height:315px;min-height:315px;background:black;border-radius:8px 8px 0px 0px;overflow:hidden;" id=iframe_player_parent>
                  	</div>
                  	<div id=player_navigation style="
                  		background:whitesmoke;
                  		border-radius:0 0 8px 8px;
                  		overflow:auto;
                  		overflow-y:hidden;
                  		align-items:center;
                  		padding:20px;
                  	">
                  		<div class=bold style=display:flex;justify-content:space-between;align-items:center;>
                  			<div>${param.link_stream ? String(param.link_stream.length) + ' Episode' : 'Episode Belum Tersedia'}</div>
                  			<div style="
                  				width:24px;height:24px;
                  				cursor:pointer;
                  			" id=episode_expand>
                  				<img src=./more/media/expand.png class=fitimage>
                  			</div>
                  		</div>
                  		<div id=list_stream_eps_el style="
                  			margin-top:20px;
                  			padding:10px;
                  			background:white;
                  			max-height:300px;
                  			overflow:auto;overflow-x:hidden;
                  			border-radius:0 0 10px 10px;
                  			display:none;
                  		"></div>
                  	</div>
                  </div>
                </div>
                <div class=sinopsis style=padding:20px;padding-top:0;>
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
                <div class=sinopsis style=padding:20px;padding-top:0;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                  ">
                    <div style="
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                        white-space:nowrap;
                    "># Laporkan Link Mati</div>
                    <div class=line></div>
                  </div>
                  <div style="
                  	overflow:auto;
                  	display:flex;gap:10px;
                  	flex-direction:column;
                  ">
                  	<div>Link streaming atau download mati? Bantu kami mengetahuinya!</div>
                  	<div style=margin-top:5px;display:flex;gap:5px;>
                  		<div class=goldbutton style=width:100%; id=reportbrokenlink><img src=./more/media/reportlinkicon.png width=32 style=border-radius:50%;>Laporkan Link Error</div>
                  	</div>
                  </div>
                </div>
                <div class=sinopsis style=padding:20px;padding-top:0;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                  ">
                    <div style="
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                        white-space:nowrap;
                    "># Rekomendasi Series</div>
                    <div class=line></div>
                  </div>
                  <div style="
                  	height:250px;
                  	overflow:auto;
                  	display:flex;gap:10px;
                  " id=recomendation_parent>
                  </div>
                </div>
                <div class=sinopsis style=padding:20px;padding-top:0;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                  ">
                    <div style="
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                        white-space:nowrap;
                    "># Donasi Ke GoSeries</div>
                    <div class=line></div>
                  </div>
                  <div style="
                  	overflow:auto;
                  	display:flex;gap:10px;
                  	flex-direction:column;
                  ">
                  	<div>Bantu GoSeries agar selalu bisa beroperasi dan menyajikan jasa dengan baik!</div>
                  	<div style=margin-top:5px;display:flex;gap:5px;>
                  		<div class=goldbutton style=justify-content:flex-start;width:100%; id=saweria><img src=./more/media/donationsaweria.jpg width=32 style=border-radius:50%;>Saweria</div>
                  		<div class=goldbutton style=justify-content:flex-start;width:100%; id=tracteer><img src=./more/media/donationtracteer.png width=32 style=border-radius:50%;>Trakteer</div>
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
				// handling error image
				this.banner_image.onerror = ()=>{
					app.imageErrorHandler(this.banner_image);
				}
				this.logo_image.onerror = ()=>{
					app.imageErrorHandler(this.logo_image);
				}
				this.generateCategories();
				this.generateInfo();
				this.initDownloadMenuNav();
				this.generateDownloadLinks();
				this.handleMoreAdminButton();
				this.handleOnlineStreams();
				this.generateRecomendation();
				this.handleSharing();
				this.handleDonations();
				this.handleBrokenLink();
				if(innerHeight <= app.footer.offsetHeight+app.content.offsetHeight+app.footer.offsetHeight){
					app.content.style.height = 'auto';
				}else app.content.style.height = '100%';
				app.removeInitLoading();
			},
			handleBrokenLink(){
				this.reportbrokenlink.onclick = async ()=>{
					app.openInitLoading();
					const response = await new Promise((resolve,reject)=>{
						cOn.get({
							url:app.getReqUrl(`brokenreport?series_id=${param.series_id}`),
							onload(){
								resolve(this.getJSONResponse());
							}
						})
					})
					app.removeInitLoading();
					let message = 'Mohon maaf terjadi kesalahan saat memproses permintaan anda!';
					if(response.valid)
						message = response.message;
					forceRecheck(app.app,message);
				}
			},
			handleDonations(){
				this.saweria.onclick = ()=>{
					window.open(app.donation.saweria,'_blank');
				}
				this.tracteer.onclick = ()=>{
					window.open(app.donation.trakteer,'_blank');
				}
			},
			handleSharing(){
				const link = `${location.hostname}${location.pathname}#Details?series_id=${param.series_id}`;
				this.copyurl.onclick = async ()=>{
					if(navigator.clipboard){
						try {
				        await navigator.clipboard.writeText(link);
				        forceRecheck(app.app,'Link berhasil disalin!');
				    } catch (err) {
				        forceRecheck(app.app,'Gagal menyalin link series!');
				    }
				    return
					}
					forceRecheck(app.app,'Gagal menyalin link series!');
				}
				this.sharetowa.onclick = ()=>{
					const message = `Ayo tonton series ${param.nama} di GoSeries!\n${link}`;
					const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
					window.open(url,'_blank');
				}
				this.sharetotele.onclick = ()=>{
					const message = `Ayo tonton series ${param.nama} di GoSeries!\n${link}`;
					const url = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(message)}`;
					window.open(url,'_blank');
				}
			},
			handleMoreAdminButton(){
				if(this.edit_series && this.statistik_series){
					this.edit_series.onclick = ()=>{
						app.changeState('Edit');
					}
					this.statistik_series.onclick = ()=>{

					}
					this.delete_series.onclick = ()=>{
						this.deleteSeries();
					}
				}
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
						innerHTML:item,
						id:item,
						onclick(){
							app.setActiveCategory(null,this.id);
							app.changeState(`Home?filter=1&key=${this.id}`);
						}
					}))
				})
			},
			generateDownloadLinks(){
				this.downloadloading.remove();
				// working batch
				if(!param.link_batch){
					this.batch.addChild(makeElement('div',{
						className:'downloaditem',
						style:'border-bottom:none;',
						innerHTML:'Link Download Belum Tersedia!'
					}))
				}else{
					param.link_batch.forEach((item,i)=>{
						this.batch.addChild(makeElement('div',{
							className:'downloaditem',
							downloadLink:item.shortenedUrl,
							style:`${i===param.link_batch.length - 1 ? 'border-bottom:none;' : ''}`,
							innerHTML:`
								<div style=white-space:nowrap;overflow:hidden;>#${i+1}. ${item.label}</div>
								<div>
									<div class=downloadbutton id=downloadbutton >
										<img src="./more/media/downloadicon.png">Download
									</div>
								</div>
							`,
							autoDefine:true,
							onadded(){
								this.downloadbutton.onclick = ()=>{
									this.openDownload();
								}
							},
							openDownload(){
								window.open(this.downloadLink,'_blank');
							}
						}))
					})
				}
				// working on per episode
				if(!param.link_episode){
					this.episode.addChild(makeElement('div',{
						className:'downloaditem',
						style:'border-bottom:none;',
						innerHTML:'Link Download Belum Tersedia!'
					}))
				}else{
					param.link_episode.forEach((item,i)=>{
						this.episode.addChild(makeElement('div',{
							className:'downloaditem',
							style:`${i===param.link_episode.length - 1 ? 'border-bottom:none;' : ''}`,
							downloadLink:item.shortenedUrl,
							innerHTML:`
								<div style=white-space:nowrap;overflow:hidden;>#${i+1}. ${item.label}</div>
								<div>
									<div class=downloadbutton id=downloadbutton >
										<img src="./more/media/downloadicon.png">Download
									</div>
								</div>
							`,
							autoDefine:true,
							onadded(){
								this.downloadbutton.onclick = ()=>{
									this.openDownload();
								}
							},
							openDownload(){
								window.open(this.downloadLink,'_blank');
							}
						}))
					})
				}
			},
			generateStreamAvailEps(){
				if(!param.link_stream)
					return this.list_stream_eps_el.addChild(makeElement('div',{
						innerHTML:`
							Episode streaming belum tersedia!
						`,
						style:`
							padding:5px;
							display:flex;
							align-items:center;
						`
					}))
				param.link_stream.forEach((item,i)=>{
					const changeEpisode = (index)=>{
						this.changeEpsisodeStream(index);
					}
					this.list_stream_eps_el.addChild(makeElement('div',{
						innerHTML:`
							<div style=min-width:24px;>${i+1}.</div>
							<div style=width:100%;white-space:nowrap;> ${item.label}</div>
							<div>
								<div class=goldbutton id=playButton>
									<img src=./more/media/playstreamicon.png class=fitimage style=width:18px;height:18px;>
									Tonton
								</div>
							</div>
						`,
						autoDefine:true,
						style:`
							padding:5px;
							display:flex;
							align-items:center;
							gap:5px;
							overflow:hidden;
							overflow-x:auto;
						`,
						index:i,
						onadded(){
							this.playButton.onclick = ()=>{
								changeEpisode(this.index);
							}
							if(i===0)
								this.playButton.click();
						}
					}))
				})
			},
			generateIframe(eps){
				if(!eps.attributes)
					eps.attributes = {};
				return makeElement('iframe',Object.assign({
					className:'iframe_player',
					src:eps.src
				},eps.attributes))
			},
			handleOnlineStreams(){
				this.pushPlayerLoading();
				this.handle_expand_eps_list();
				this.generateStreamAvailEps();
			},
			handle_expand_eps_list(){
				this.episode_expand.onclick = ()=>{
					if(this.episode_expand.expanded){
						this.episode_expand.expanded = false;
						this.episode_expand.find('img').updateStyle({
							transform:'rotate(0deg)'
						})
						this.list_stream_eps_el.hide();
						return
					}
					this.episode_expand.expanded = true;
					this.list_stream_eps_el.show('block');
					this.episode_expand.find('img').updateStyle({
						transform:'rotate(-180deg)'
					})
				}
			},
			pushPlayerLoading(){
				this.iframe_player_parent.addChild(makeElement('div',{
					id:'initLoading',
					style:`
						display:flex;justify-content:center;
						align-items:center; 
						flex-direction:column;
						height:100%;
						gap:20px;
					`,
					innerHTML:`
						<div>
							<img src=./more/media/playstreamicon.png>
						</div>
						<div style="
							font-weight:bold;
							color:white;
						">Silahkan pilih episode!</div>
					`
				}));
			},
			changeEpsisodeStream(index){
				this.iframe_player_parent.replaceChild(this.generateIframe({src:param.link_stream[index].link,attributes:param.link_stream[index].attribute}))
			},
			async deleteSeries(){
				if(!app.hashParam)
					return alert('Aksi tidak valid!');
				const permission = prompt('Beneran mau dihapus?','Tidak/Ya');
				if(permission.toLowerCase() !== 'ya' )
					return
				const response = await new Promise((resolve,reject)=>{
					cOn.get({
						url:app.getReqUrl(`delete?series_id=${app.hashParam.series_id}`),
						onload(){
							resolve(this.getJSONResponse());
						}
					})
				})
				if(response.valid){
					alert(response.message);
					location.hash = 'Home';
					return 
				}
				return alert('Something is wrong, while trying to delete the series!');
			},
			generateRecomendation(){
				const series_recomended_id = [];
				let series_id_all = [];
				param.kategori.forEach((c)=>{
					series_id_all = series_id_all.concat(app.home_data.data.kategori[c].filter((x)=>x!==param.series_id));
				})
				const limit = series_id_all.length >= 6 ? 6 : series_id_all.length;
				while(series_recomended_id.length < limit){
					const series_id = series_id_all.getRandom();
					if(!series_recomended_id.includes(series_id)){
						series_recomended_id.push(series_id);
					}
				}
				const data = [];
				series_recomended_id.forEach((id)=>{
					data.push(app.home_data.data.series[id]);
				})
				data.forEach((d)=>{
					this.recomendation_parent.addChild(makeElement('div',{
						style:`
							min-width:200px;
            	max-width:200px;
            	height:100%;
            	background:white;
            	border-radius:10px;
            	overflow: hidden;
					    position: relative;
					    cursor: pointer;
						`,
						innerHTML:`
							<div style=width:100%;height:100%;>
            		<img src="${d.logo_series}" class=fitimage>
            	</div>
            	<div style="
            		position: absolute;
						    bottom: 0;
						    width:100%;
						    background: whitesmoke;
						    color: black;
						    border-radius:0 0 10px 10px;
            	">
            		<div style="
						    	padding: 10px 10px 0 10px;
            		">${d.nama}</div>
            		<div class=smallone style="
            			margin-top: 10px;
									padding: 0 10px 10px 10px;
            		">${d.keterangan['Updated on'] ? d.keterangan['Updated on'] : d.keterangan['Released on'] ? d.keterangan['Released on'] : d.keterangan['Released'] ? d.keterangan['Released'] : '-'}, ${d.keterangan['Status']}</div>
            	</div>
						`,data:d,
						onadded(){
							const image_thumb = this.find('img');
							image_thumb.onerror = ()=>{
								app.imageErrorHandler(image_thumb);
							}
						},
						onclick(){
							app.changeState(`Refresh`,this.data);
						}
					}))
				})
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
                background: white;
                border-radius: 8px;
                width: 100%;
                border: 1px solid gainsboro;
              " class=card>
              	<div style=display:flex;gap:5px;padding:20px;>
              		<div class=goldbutton style=gap:5px;width:100%; id=savebutton>
	              		<img src=./more/media/saveicon.png width=24>
	              		Publish Series
	              	</div>
              	</div>
              	<div class=bold style="padding:0 20px;">Tambah Series</div>
              	<div style=margin-top:20px;padding:20px;padding-top:0px;>
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
              				<img src="./more/media/nopreview.png" class=fitimage>
              			</div>
              			<div style=display:flex;>
              				<input type=file accept=image/png id=logo_series>
              			</div>
              			<div>
              				<div style=margin-bottom:5px;>Eksternal Link</div>
              				<div style=display:flex;>
              					<input placeholder="Masukan eksternal link (optional)" id=logo_series_link>
              				</div>
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Banner Series</div>
              			<div class='child imagepreview' id=image_preview_banner>
              				<img src="./more/media/nopreview.png" class=fitimage>
              			</div>
              			<div style=display:flex;>
              				<input type=file accept=image/png id=banner_series>
              			</div>
              			<div>
              				<div style=margin-bottom:5px;>Eksternal Link</div>
              				<div style=display:flex;>
              					<input placeholder="Masukan eksternal link (optional)" id=banner_series_link>
              				</div>
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
              						<input id=link_batch placeholder="Masukan Value Link...">
              					</div>
              				</div>
              			</div>
              			<div style=display:flex;gap:8px;justify-content:space-between;>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Label</div>
              					<div style=display:flex;width:100%;>
              						<input id=label_batch placeholder="Masukan Lable Link Batch...">
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
              						<input id=link_episode placeholder="Masukan Value Link...">
              					</div>
              				</div>
              			</div>
              			<div style=display:flex;gap:8px;justify-content:space-between;>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Label</div>
              					<div style=display:flex;width:100%;>
              						<input id=label_episode placeholder="Masukan Label Episode...">
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
              		<div style=display:flex;flex-direction:column;gap:10px;margin-bottom:10px;>
              			<div>Link Streaming</div>
              			<div class='linkbox' id=link_box_stream>
              			</div>
              			<div style=display:flex;gap:8px;justify-content:space-between;>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Link</div>
              					<div style=display:flex;width:100%;>
              						<input id=link_stream placeholder="Masukan Src Link...">
              					</div>
              				</div>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Label</div>
              					<div style=display:flex;width:100%;>
              						<input id=label_stream placeholder="Masukan Label Link...">
              					</div>
              				</div>
              			</div>
              			<div style=display:flex;gap:8px;justify-content:space-between;align-items:flex-start;flex-direction:column;>
              				<div style="display:flex;width:100%;background: whitesmoke;border: 1px solid gainsboro;border-radius: 5px;flex-direction:column;">
              					<div style=display:flex;align-items:center;padding:10px;padding-bottom:0;>Attributes</div>
              					<div style=display:flex;padding:10px;>
              						<textarea id=attribute_stream placeholder="Masukan Attributes..." class=child></textarea>
              					</div>
              				</div>
              				<div class=goldbutton id=new_link_stream>
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
				this.newLinkInit('episode');
				this.newLinkInit('batch');
				this.newLinkInit('stream');
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
				link_stream:[],
				kategori:null,
				small_title:null,
				logo_series_link:null,
				banner_series_link:null
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
				link_episode:'JSON',
				banner_series_link:'string',
				logo_series_link:'string',
				link_stream:'JSON'
			},
			newLinkInit(state){

				const edit_status = {
					batch:{
						active:false,
						index:null
					},
					episode:{
						active:false,
						index:null
					},
					stream:{
						active:false,
						index:null
					}
				}

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

				const edit_link = (index,state,el)=>{
					edit_status[state].active = true;
					edit_status[state].index = index;
					if(edit_status[state].el)
						edit_status[state].el.click();
					edit_status[state].el = el;

					const link = this.series_data[`link_${state}`][index];
					this[`label_${state}`].value = link.label;
					this[`link_${state}`].value = link.link;
					if(state==='stream')
							this.attribute_stream.value = this.getJSONUrlString(link.attribute);
				}

				const un_edit_link = (state,click=false)=>{
					edit_status[state].active = false;
					edit_status[state].index = null;
					if(edit_status[state].el && click)
						edit_status[state].el.click();
					edit_status[state].el = null;

					this[`label_${state}`].value = '';
					this[`link_${state}`].value = '';
				}

				const display_link_ = (param,param2=null)=>{
					param.forEach((item)=>{
						const index = item.index;
						const label = item.label;
						const link = item.link;
						this[`link_box_${!param2?state:param2}`].addChild(makeElement('div',{
							style:`padding:10px;background:white;display:flex;
								gap:8px;
							`,
							id:index+1,
							className:'EpsElItem',
							innerHTML:`
								<div style=display:flex;align-items:center;justify-content:center;min-width:32px;>
									${index+1}.
								</div>
								<div style=width:100%;display:flex;justify-content:center;flex-direction:column;overflow:hidden;>
									<div class="bold bigone" id=label>${label}</div>
									<div class=smallone>
										<a href="${link}" target=_blank style=color:gray;font-weight:bold;white-space:nowrap; id=link class=child>${link.slice(0,50)}...</a>
									</div>
								</div>
								<div class=goldbutton class="child" id=edit_link style=background:whitesmoke;color:black;>
									<img src=./more/media/editiconblack.png width=24>
									<span></span>
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
								this.edit_link.onclick = ()=>{
									if(this.edit_link.is_active){
										this.edit_link.is_active = false;
										this.edit_link.find('span').innerText = '';
										un_edit_link(state);
										return;
									}
									this.edit_link.is_active = true;
									this.edit_link.find('span').innerText = 'Editing';
									edit_link(index,state,this.edit_link);
								}
							}
						}))
					})
				}
				this[`new_link_${state}`].onclick = ()=>{
					const label = this[`label_${state}`].value;
					let link = this[`link_${state}`].value;
					const index = edit_status[state].index !== null ? edit_status[state].index : this.series_data[`link_${state}`].length;
					const encode = state==='stream' ? '0' : this[`encode_${state}`].value;
					const attribute = state==='stream' ? this.getJSONParsed(this.attribute_stream.value) : null;

					// handle 0 value
					if(!label.length || !link.length || !encode.length)
						return alert('Please fill out the data corectly!!!');


					if(encode==='1')
						link = this.encodeClicksFlyLink(link);

					// handle edit state
					if(edit_status[state].active){
						
						this.series_data[`link_${state}`][index].label = label;
						this.series_data[`link_${state}`][index].link = link;
						if(state==='stream')
							this.series_data.link_stream[index].attribute = attribute;

						const el = this[`link_box_${state}`].findall('.EpsElItem')[index];
						el.label.innerHTML = label;
						el.link.href = link;
						el.link.innerHTML = link.slice(0,50)+'...';
						un_edit_link(state,true);
					}else{
						const data_obj = {link,label,index};
						
						if(state==='stream')
							data_obj.attribute = attribute;

						this.series_data[`link_${state}`].push(data_obj);
						display_link_([{link,label,index}]);
					}

					this[`link_${state}`].value = '';
					this[`label_${state}`].value = '';
					if(state==='stream')
							this.attribute_stream.value = '';
				}
			},
			encodeClicksFlyLink(link){
				const splited = link.split('&');
				try{
					return atob(splited[1].split('=')[1]);
				}catch(e){
					alert('Fail to encode the link, make sure the link is correct!');
				}
			},
			handleImagesFile(){
				this.banner_series.onchange = ()=>{
					display_image(this.banner_series.files[0],this.image_preview_banner);
				}
				this.logo_series.onchange = ()=>{
					display_image(this.logo_series.files[0],this.image_preview_icon);
				}
				this.banner_series_link.onchange = ()=>{
					this.image_preview_banner.find('img').src = this.banner_series_link.value;
				}
				this.logo_series_link.onchange = ()=>{
					this.image_preview_icon.find('img').src = this.logo_series_link.value;
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
					if(i==='banner_series_link' || i==='logo_series_link')
						continue;
					if(this.data_types[i] === 'file' && this.series_data[`${i}_link`].length > 0)
						continue;
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
				app.openInitLoading();
				cOn.post({
					url:app.getReqUrl('newseries'),
					data:param,
					onload(){
						alert(this.getJSONResponse().message);
						app.openNewSeries();
						app.removeInitLoading();
					}
				})
			},
			getJSONUrlString(param){
				let text = '';
				const keys = Object.keys(param);
				for(let i=0;i<keys.length;i++){
					text += `${keys[i]}=${param[keys[i]]}${i===keys.length-1?'':'\n'}`;
				}
				return text;
			}
		})
	},
	edit(){
		return makeElement('div',{
			className:'detail',
			innerHTML:`
				<div class=container>
          <div class=seperator></div>
          <div style=width:100%;>
            <div style='display: flex;' class=width50>
              <div style="
                background: white;
                border-radius: 8px;
                width: 100%;
              " class=card>
              	<div style=display:flex;gap:5px;padding:20px;>
              		<div class=goldbutton style=gap:5px;width:100%; id=savebutton>
	              		<img src=./more/media/saveicon.png width=24>
	              		Simpan Series
	              	</div>
              	</div>
              	<div class=bold style="padding:0 20px;">Edit Series</div>
              	<div style=margin-top:20px;padding:20px;padding-top:0px;>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Nama Series</div>
              			<div style=display:flex;>
              				<input id=nama  placeholder="Masukan Nama Series" value="${app.hashParam.nama}">
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Small Title</div>
              			<div style=display:flex;>
              				<input id=small_title  placeholder="Masukan Small Title Series" value="${app.hashParam.small_title}">
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Sinopsis</div>
              			<div style=display:flex;>
              				<textarea class=child id=sinopsis placeholder="Masukan Sinopsis Series!">${app.hashParam.sinopsis}</textarea>
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>kategori</div>
              			<div style=display:flex;>
              				<textarea class=child id=kategori placeholder="Pisahkan dengan ','">${app.hashParam.kategori.toString()}</textarea>
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Keterangan Series</div>
              			<div style=display:flex;>
              				<textarea class=child id=keterangan placeholder="Masukan Keterangan Series">${app.kategoriToString()}</textarea>
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Icon Series</div>
              			<div class='child imagepreview' id=image_preview_icon>
              				<img src="${app.hashParam.logo_series}" class=fitimage>
              			</div>
              			<div style=display:flex;>
              				<input type=file accept=image/png id=logo_series>
              			</div>
              			<div>
              				<div style=margin-bottom:5px;>Eksternal Link</div>
              				<div style=display:flex;>
              					<input placeholder="Masukan eksternal link (optional)" id=logo_series_link value="${app.hashParam.logo_series}">
              				</div>
              			</div>
              		</div>
              		<div style=display:flex;flex-direction:column;gap:5px;margin-bottom:10px;>
              			<div>Banner Series</div>
              			<div class='child imagepreview' id=image_preview_banner>
              				<img src="${app.hashParam.banner_series}" class=fitimage>
              			</div>
              			<div style=display:flex;>
              				<input type=file accept=image/png id=banner_series>
              			</div>
              			<div>
              				<div style=margin-bottom:5px;>Eksternal Link</div>
              				<div style=display:flex;>
              					<input placeholder="Masukan eksternal link (optional)" id=banner_series_link value="${app.hashParam.banner_series}">
              				</div>
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
              						<input id=link_batch placeholder="Masukan Value Link...">
              					</div>
              				</div>
              			</div>
              			<div style=display:flex;gap:8px;justify-content:space-between;>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Label</div>
              					<div style=display:flex;width:100%;>
              						<input id=label_batch placeholder="Masukan Lable Link Batch...">
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
              						<input id=link_episode placeholder="Masukan Value Link...">
              					</div>
              				</div>
              			</div>
              			<div style=display:flex;gap:8px;justify-content:space-between;>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Label</div>
              					<div style=display:flex;width:100%;>
              						<input id=label_episode placeholder="Masukan Label Episode...">
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
              		<div style=display:flex;flex-direction:column;gap:10px;margin-bottom:10px;>
              			<div>Link Streaming</div>
              			<div class='linkbox' id=link_box_stream>
              			</div>
              			<div style=display:flex;gap:8px;justify-content:space-between;>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Link</div>
              					<div style=display:flex;width:100%;>
              						<input id=link_stream placeholder="Masukan Src Link...">
              					</div>
              				</div>
              				<div style="display:flex;align-items:center;gap:5px;width:100%;background: whitesmoke;padding: 5px 10px;border: 1px solid gainsboro;border-radius: 5px;">
              					<div>Label</div>
              					<div style=display:flex;width:100%;>
              						<input id=label_stream placeholder="Masukan Label Link...">
              					</div>
              				</div>
              			</div>
              			<div style=display:flex;gap:8px;justify-content:space-between;align-items:flex-start;flex-direction:column;>
              				<div style="display:flex;width:100%;background: whitesmoke;border: 1px solid gainsboro;border-radius: 5px;flex-direction:column;">
              					<div style=display:flex;align-items:center;padding:10px;padding-bottom:0;>Attributes</div>
              					<div style=display:flex;padding:10px;>
              						<textarea id=attribute_stream placeholder="Masukan Attributes..." class=child></textarea>
              					</div>
              				</div>
              				<div class=goldbutton id=new_link_stream>
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
				this.newLinkInit('episode');
				this.newLinkInit('batch');
				this.newLinkInit('stream');
				this.handleImagesFile();

				this.savebutton.onclick = ()=>{
					this.collapseData();
				}
				// including the series id
				this.series_data.series_id = app.hashParam.series_id;
			},
			series_data:{
				nama:null,
				sinopsis:null,
				banner_series:null,
				logo_series:null,
				keterangan:null,
				link_episode:[],
				link_batch:[],
				link_stream:[],
				kategori:null,
				small_title:null,
				logo_series_link:null,
				banner_series_link:null,
				series_id:null
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
				link_episode:'JSON',
				banner_series_link:'string',
				logo_series_link:'string',
				link_stream:'JSON'
			},
			newLinkInit(state){

				const edit_status = {
					batch:{
						active:false,
						index:null
					},
					episode:{
						active:false,
						index:null
					},
					stream:{
						active:false,
						index:null
					}
				}

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

				const edit_link = (index,state,el)=>{
					edit_status[state].active = true;
					edit_status[state].index = index;
					if(edit_status[state].el)
						edit_status[state].el.click();
					edit_status[state].el = el;

					const link = this.series_data[`link_${state}`][index];
					this[`label_${state}`].value = link.label;
					this[`link_${state}`].value = link.link;
					if(state==='stream')
							this.attribute_stream.value = this.getJSONUrlString(link.attribute);
				}

				const un_edit_link = (state,click=false)=>{
					edit_status[state].active = false;
					edit_status[state].index = null;
					if(edit_status[state].el && click)
						edit_status[state].el.click();
					edit_status[state].el = null;

					this[`label_${state}`].value = '';
					this[`link_${state}`].value = '';
				}

				const display_link_ = (param,param2=null)=>{
					param.forEach((item)=>{
						const index = item.index;
						const label = item.label;
						const link = item.link;
						this[`link_box_${!param2?state:param2}`].addChild(makeElement('div',{
							style:`padding:10px;background:white;display:flex;
								gap:8px;
							`,
							id:index+1,
							className:'EpsElItem',
							innerHTML:`
								<div style=display:flex;align-items:center;justify-content:center;min-width:32px;>
									${index+1}.
								</div>
								<div style=width:100%;display:flex;justify-content:center;flex-direction:column;overflow:hidden;>
									<div class="bold bigone" id=label>${label}</div>
									<div class=smallone>
										<a href="${link}" target=_blank style=color:gray;font-weight:bold;white-space:nowrap; id=link class=child>${link.slice(0,50)}...</a>
									</div>
								</div>
								<div class=goldbutton class="child" id=edit_link style=background:whitesmoke;color:black;>
									<img src=./more/media/editiconblack.png width=24>
									<span></span>
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
								this.edit_link.onclick = ()=>{
									if(this.edit_link.is_active){
										this.edit_link.is_active = false;
										this.edit_link.find('span').innerText = '';
										un_edit_link(state);
										return;
									}
									this.edit_link.is_active = true;
									this.edit_link.find('span').innerText = 'Editing';
									edit_link(index,state,this.edit_link);
								}
							}
						}))
					})
				}
				this[`new_link_${state}`].onclick = ()=>{
					const label = this[`label_${state}`].value;
					let link = this[`link_${state}`].value;
					const index = edit_status[state].index !== null ? edit_status[state].index : this.series_data[`link_${state}`].length;
					const encode = state==='stream' ? '0' : this[`encode_${state}`].value;
					const attribute = state==='stream' ? this.getJSONParsed(this.attribute_stream.value) : null;

					// handle 0 value
					if(!label.length || !link.length || !encode.length)
						return alert('Please fill out the data corectly!!!');


					if(encode==='1')
						link = this.encodeClicksFlyLink(link);

					// handle edit state
					if(edit_status[state].active){
						
						this.series_data[`link_${state}`][index].label = label;
						this.series_data[`link_${state}`][index].link = link;
						if(state==='stream')
							this.series_data.link_stream[index].attribute = attribute;

						const el = this[`link_box_${state}`].findall('.EpsElItem')[index];
						el.label.innerHTML = label;
						el.link.href = link;
						el.link.innerHTML = link.slice(0,50)+'...';
						un_edit_link(state,true);
					}else{
						const data_obj = {link,label,index};
						
						if(state==='stream')
							data_obj.attribute = attribute;

						this.series_data[`link_${state}`].push(data_obj);
						display_link_([{link,label,index}]);
					}

					this[`link_${state}`].value = '';
					this[`label_${state}`].value = '';
					if(state==='stream')
							this.attribute_stream.value = '';
				}

				// handling edit
				if(app.hashParam[`link_${state}`] && app.hashParam[`link_${state}`].length > 0){
					app.hashParam[`link_${state}`].forEach((item)=>{
						this.series_data[`link_${state}`].push(item);
						display_link_([item],state);
					})
				}
			},
			encodeClicksFlyLink(link){
				const splited = link.split('&');
				try{
					return atob(splited[1].split('=')[1]);
				}catch(e){
					alert('Fail to encode the link, make sure the link is correct!');
				}
			},
			handleImagesFile(){
				this.banner_series.onchange = ()=>{
					display_image(this.banner_series.files[0],this.image_preview_banner);
				}
				this.logo_series.onchange = ()=>{
					display_image(this.logo_series.files[0],this.image_preview_icon);
				}
				this.banner_series_link.onchange = ()=>{
					this.image_preview_banner.find('img').src = this.banner_series_link.value;
				}
				this.logo_series_link.onchange = ()=>{
					this.image_preview_icon.find('img').src = this.logo_series_link.value;
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
					if(i==='banner_series_link' || i==='logo_series_link')
						continue;
					if(this.data_types[i] === 'file' && this.series_data[`${i}_link`].length > 0)
						continue;
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
				app.openInitLoading();
				cOn.post({
					url:app.getReqUrl('editseries'),
					data:param,
					onload(){
						alert(this.getJSONResponse().message);
						app.openNewSeries();
						app.removeInitLoading();
					}
				})
			},
			getJSONUrlString(param){
				let text = '';
				const keys = Object.keys(param);
				for(let i=0;i<keys.length;i++){
					text += `${keys[i]}=${param[keys[i]]}${i===keys.length-1?'':'\n'}`;
				}
				return text;
			}
		})
	},
	moreinfo(){
		return makeElement('div',{
			className:'detail',
			innerHTML:`
				<div class=container>
          <div class=seperator></div>
          <div style=width:100%;>
            <div style='display: flex;' class=width50>
              <div style="
                background: white;
                border-radius: 8px;
                width: 100%;
              " class=card>
              	<div style=display:${app.is_admin?'flex':'none'};gap:5px;margin:20px;margin-bottom:0;overflow:auto;>
              		<div class=goldbutton style=gap:5px;width:100%; id=edit_information>
	              		<img src=./more/media/editicon.png width=18>
	              		Edit Information
	              	</div>
              	</div>
              	<div class=sinopsis style=padding:20px;padding-top:0;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin: 20px 0;
                  ">
                    <div style="
                    		white-space:nowrap;
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                    "># Apa itu GoSeries?</div>
                    <div class=line></div>
                  </div>
                  <div class=info id=infodrama>
                  	${app.home_data.data.webinfo?.whatisgoseries?app.home_data.data.webinfo.whatisgoseries:'-'}
                  </div>
                </div>
                <div class=sinopsis style=padding:20px;padding-top:0;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom:20px;
                  ">
                    <div style="
                    		white-space:nowrap;
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                    "># Cara Download Di GoSeries</div>
                    <div class=line></div>
                  </div>
                  <div class=info id=infodrama>
                  	${app.home_data.data.webinfo?.howtodownload?app.home_data.data.webinfo.howtodownload:'-'}
                  </div>
                </div>
                <div class=sinopsis style=padding:20px;padding-top:0;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom:20px;
                  ">
                    <div style="
                    		white-space:nowrap;
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                    "># Pasang Iklan</div>
                    <div class=line></div>
                  </div>
                  <div class=info id=infodrama>
                  	${app.home_data.data.webinfo?.pasangiklan?app.home_data.data.webinfo.pasangiklan:'-'}
                  </div>
                </div>
                <div class=sinopsis style=display:${app.is_admin?'block':'none'};padding:20px;padding-top:0;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom:20px;
                  ">
                    <div style="
                    		white-space:nowrap;
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                    "># Broken Link Reports</div>
                    <div class=line></div>
                  </div>
                  <div class=info id=infodrama>
                  	<div>
                  		${app.home_data.data.brokenreport?`Ada ${objlen(app.home_data.data.brokenreport)} Laporan.`:'Belum ada laporan!'}
                  	</div>
                  	<div class=goldbutton style=margin-top:10px; id=reportpagebutton>Buka Halaman Report</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      autoDefine:true,
      onadded(){
      	if(!app.moreinfobutton.classList.contains('activecategory'))
      		app.setActiveCategory(app.moreinfobutton);
      	this.edit_information.onclick = ()=>{
      		app.changeState('Editwebinformation');
      	}
      	this.reportpagebutton.onclick = ()=>{
      		app.changeState('Reportbroken');
      	}
      }
    })
	},
	editwebinformation(){
		return makeElement('div',{
			className:'detail',
			innerHTML:`
				<div class=container>
          <div class=seperator></div>
          <div style=width:100%;>
            <div style='display: flex;' class=width50>
              <div style="
                background: white;
                border-radius: 8px;
                width: 100%;
              " class=card>
              	<div style=display:flex;gap:5px;margin:20px;margin-bottom:0;overflow:auto;>
              		<div class=goldbutton style=gap:5px;width:100%; id=edit_information>
	              		<img src=./more/media/saveicon.png width=18>
	              		Save Information
	              	</div>
              	</div>
              	<div class=sinopsis style=padding:20px;padding-top:0;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin: 20px 0;
                  ">
                    <div style="
                    		white-space:nowrap;
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                    "># Apa itu GoSeries?</div>
                    <div class=line></div>
                  </div>
                  <div class=info style="display:flex;">
                  	<textarea id=whatisgoseries>${app.home_data.data.webinfo?.whatisgoseries?app.home_data.data.webinfo.whatisgoseries:'-'}</textarea>
                  </div>
                </div>
                <div class=sinopsis style=padding:20px;padding-top:0;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom:20px;
                  ">
                    <div style="
                    		white-space:nowrap;
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                    "># Cara Download Di GoSeries</div>
                    <div class=line></div>
                  </div>
                  <div class=info style="display:flex;">
                  	<textarea id=howtodownload>${app.home_data.data.webinfo?.howtodownload?app.home_data.data.webinfo.howtodownload:'-'}</textarea>
                  </div>
                </div>
                <div class=sinopsis style=padding:20px;padding-top:0;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom:20px;
                  ">
                    <div style="
                    		white-space:nowrap;
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                    "># Pasang Iklan</div>
                    <div class=line></div>
                  </div>
                  <div class=info style="display:flex;">
                  	<textarea id=pasangiklan>${app.home_data.data.webinfo?.pasangiklan?app.home_data.data.webinfo.pasangiklan:'-'}</textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      autoDefine:true,
      onadded(){
      	if(!app.moreinfobutton.classList.contains('activecategory'))
      		app.setActiveCategory(app.moreinfobutton);
      	this.edit_information.onclick = ()=>{
      		this.processData();
      	}
      },
      async processData(){
      	const data = {};
      	this.findall('textarea').forEach((tx)=>{
      		data[tx.id] = tx.value;
      	})
      	const response = await new Promise((resolve,reject)=>{
      		cOn.post({
      			url:app.getReqUrl('editinformationweb'),
      			someSettings:[['setRequestHeader','content-type','application/json']],
      			data:jsonstr(data),
      			onload(){
      				resolve(this.getJSONResponse());
      			}
      		})
      	})
      	if(response.valid)
      		alert(response.message);
      		return location.reload();
      	alert('Something is wrong!!!');
      }
    })
	},
	brokenreportpage(){
		return makeElement('div',{
			className:'detail',
			innerHTML:`
				<div class=container>
          <div class=seperator></div>
          <div style=width:100%;>
            <div style='display: flex;' class=width50>
              <div style="
                background: white;
                border-radius: 8px;
                width: 100%;
              " class=card>
              	<div class=sinopsis style=padding:20px;padding-top:0;>
                  <div style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin: 20px 0;
                  ">
                    <div style="
                    		white-space:nowrap;
                        background: #00b5ff;
                        padding: 5px 10px;
                        border-radius: 0 20px 20px 0;
                        text-align: center;
                        font-weight: bold;
                        color: white;
                    "># Broken links Report</div>
                    <div class=line></div>
                  </div>
                  <div class=info id=list_parent>
                  	${app.home_data.data.brokenreport?`Memuat ${objlen(app.home_data.data.brokenreport)} Laporan...`:'Belum ada laporan!'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      autoDefine:true,
      onadded(){
      	this.loadReports();
      },
      loadReports(){
      	if(objlen(app.home_data.data.brokenreport||{}) > 0){
      		this.list_parent.clear();
      		let index = 0;
      		for(let i in app.home_data.data.brokenreport){
      			const data = app.home_data.data.brokenreport[i];
      			this.list_parent.addChild(makeElement('div',{
      				data,
      				innerHTML:`
      					<div>${index+1}. </div>
      					<div style=width:100%;overflow:hidden;white-space:nowrap;>${data.series.nama} - <span class=bold>${data.report_time}</span></div>
      					<div class=goldbutton id=fixed>Fixed</div>
      				`,
      				style:`
      					display:flex;
      					align-items:center;
      					padding:5px 8px;
      					gap:5px;
      				`,
      				autoDefine:true,
      				onadded(){
      					this.fixed.onclick = async ()=>{
      						app.openInitLoading();
      						const response = await new Promise((resolve,reject)=>{
      							cOn.get({
      								url:app.getReqUrl(`fixbroken?series_id=${this.data.time_stamp}`),
      								onload(){
      									resolve(this.getJSONResponse());
      								}
      							})
      						})
      						app.removeInitLoading();
      						forceRecheck(app.app,response.valid?response.message:'Terjadi kesalahan!');
      					}
      				}
      			}))
      			index += 1;
      		}
      	}
      }
    })
	},
	server404(){
		return makeElement('div',{
			id:'initLoading',
			style:`
				background:#f5f5f5eb;
				position:fixed;
				display:flex;justify-content:center;
				align-items:center; 
				top:0;left:0;width:100%;height:100%;z-index:20;
				flex-direction:column;
				gap:10px;
			`,
			innerHTML:`
				<div style="
					font-weight:bold;color:gray;font-size:bigger;
				">Mohon Maaf</div>
				<div style="
					font-weight:bold;color:gray;font-size:smaller;
				">Saat ini GoSeries sedang dalam perbaikan!</div>
			`
		})
	}
}
