<template>
	<div class="area margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.area.title')">
            <div @click="query(level)" class="up" slot="right">{{$t('mine.area.levelup')}}</div>
        </x-header>
        <div class="main-container">
            <div>
                <Input search @on-search="query(keyword)" v-model="keyword" enter-button :placeholder="$t('mine.area.enter')" />
            </div>
            <div class="mr20 base-color">
                <v-grid class="pb">
                    <flexbox>
                        <flexbox-item class="text-left">
                            <div class="v-dottedline">{{$t('mine.area.nickname')}}：{{NickName}}</div>
                            <div class="v-dottedline">{{$t('mine.area.invitecode')}}：{{InviteCode}}</div>
                            <!-- <div>{{$t('mine.area.v1count')}}：{{V1_Count}}</div> -->
                            <div class="v-dottedline">{{$t('mine.area.v1bdc')}}：{{$numberComma(V1_BDC)}}</div>
                        </flexbox-item>
                        <flexbox-item class="text-right">
                            <div class="v-dottedline">{{$t('mine.area.groupcount')}}：{{$numberComma(GroupCount)}}</div>
                            <div class="v-dottedline">{{$t('mine.area.groupbdc')}}：{{$numberComma(GroupBDC)}}</div>
                            <!-- <div>{{$t('mine.area.v2count')}}：{{V2_Count}}</div> -->
                            <div class="v-dottedline">{{$t('mine.area.v2bdc')}}：{{$numberComma(V2_BDC)}}</div>
                        </flexbox-item>
                    </flexbox>
                </v-grid>
            </div>
            <div class="mr20">
                <!-- <table class="table">
                    <thead>
                        <tr>
                            <th v-for="(v,index) in th" :key="index">{{v.title}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(v,index) in dataList" :key="index">
                            <td @click="query(v.AccountId)">{{v.Area}}</td>
                            <td @click="query(v.AccountId)">{{v.NickName}}</td>
                            <td @click="query(v.AccountId)">{{v.TotalAssets}}</td>
                            <td @click="query(v.AccountId)">{{v.InviteCode}}</td>
                            <td><span v-clipboard:copy="v.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</span></td>
                        </tr>
                    </tbody>
                </table> -->
                <div class="family">
                    <div class="root mr">
                        <div class="childBlock border">
                            <div v-if="f1.InviteCode">
                                <div class="v-dottedline" @click="query(f1.AccountId)">{{f1.Area}}</div>
                                <div class="v-dottedline" @click="query(f1.AccountId)">{{f1.NickName}}{{f1.LevelName}}</div>
                                <div class="v-dottedline" @click="query(f1.AccountId)">{{$numberComma(f1.TotalAssets)}}</div>
                                <div class="v-dottedline" @click="query(f1.AccountId)">{{f1.GroupSurplus}}</div>
                                <div class="copy">
                                    <div>{{f1.InviteCode}}</div>
                                    <div><button class="btn btn-xs btn-round" v-clipboard:copy="f1.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="father mr childRow">
                        <!-- <div class="mr"> -->
                            <!-- 循环二级层 -->
                            <div class="childBlock">
                                <div v-if="f2.InviteCode">
                                    <div class="v-dottedline" @click="query(f2.AccountId)">{{f2.Area}}</div>
                                    <div class="v-dottedline nick" @click="query(f2.AccountId)">{{f2.NickName}}{{f2.LevelName}}</div>
                                    <div class="v-dottedline" @click="query(f2.AccountId)">{{$numberComma(f2.TotalAssets)}}</div>
                                    <div class="v-dottedline" @click="query(f2.AccountId)">{{f2.GroupSurplus}}</div>
                                    <div class="copy">
                                        <div>{{f2.InviteCode}}</div>
                                        <div><button class="btn btn-xs btn-round" v-clipboard:copy="f2.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                    </div>
                                </div>
                                <div class="areareg" v-else>
                                    <!-- A区传值 -->
                                    <!-- {{$t('mine.area.invitecode')}}：{{InviteCode}}
                                    <div class="btnreg">
                                        <button class="btn btn-auto btn-round" @click="toRegist(InviteCode,'A',f1.AccountId,f1.AccountId+'A')">{{$t('global.regist')}}</button>
                                        <button class="btn btn-auto btn-round" @click="ViewLink(InviteCode,'A',f1.AccountId,f1.AccountId+'A')">{{$t('mine.area.viewLink')}}</button>
                                    </div> -->
                                    <!-- {{$t('mine.area.invitecode')}}：{{MyInviteCode}} -->
                                    <div class="btnreg">
                                        <button class="btn btn-auto btn-round" @click="toRegist(MyInviteCode,'A',f1.AccountId,f1.AccountId+'A')">{{$t('global.regist')}}</button>
                                        <!-- <button class="btn btn-auto btn-round" @click="ViewLink(MyInviteCode,'A',f1.AccountId,f1.AccountId+'A')">{{$t('mine.area.viewLink')}}</button> -->
                                    </div>
                                    <div class="note"><button class="btn btn-red btn-auto btn-round">{{$t('mine.area.note')}}：{{f1.AccountId}}A</button></div>
                                </div>
                            </div>
                            <!-- <div class="blank">
                                
                            </div> -->
                            <div class="childBlock">
                                <div v-if="f3.InviteCode">
                                    <div class="v-dottedline" @click="query(f3.AccountId)">{{f3.Area}}</div>
                                    <div class="v-dottedline nick" @click="query(f3.AccountId)">{{f3.NickName}}{{f3.LevelName}}</div>
                                    <div class="v-dottedline" @click="query(f3.AccountId)">{{$numberComma(f3.TotalAssets)}}</div>
                                    <div class="v-dottedline" @click="query(f3.AccountId)">{{f3.GroupSurplus}}</div>
                                    <div class="copy">
                                        <div>{{f3.InviteCode}}</div>
                                        <div><button class="btn btn-xs btn-round" v-clipboard:copy="f3.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                    </div>
                                </div>
                                <div class="areareg" v-else>
                                    <!-- B区传值 -->
                                    <!-- {{$t('mine.area.invitecode')}}：{{InviteCode}}
                                    <div class="btnreg">
                                        <button class="btn btn-auto btn-round" @click="toRegist(InviteCode,'B',f1.AccountId,f1.AccountId+'B')">{{$t('global.regist')}}</button>
                                        <button class="btn btn-auto btn-round" @click="ViewLink(InviteCode,'B',f1.AccountId,f1.AccountId+'B')">{{$t('mine.area.viewLink')}}</button>
                                    </div> -->
                                    <!-- {{$t('mine.area.invitecode')}}：{{MyInviteCode}} -->
                                    <div class="btnreg">
                                        <button class="btn btn-auto btn-round" @click="toRegist(MyInviteCode,'B',f1.AccountId,f1.AccountId+'B')">{{$t('global.regist')}}</button>
                                        <!-- <button class="btn btn-auto btn-round" @click="ViewLink(MyInviteCode,'B',f1.AccountId,f1.AccountId+'B')">{{$t('mine.area.viewLink')}}</button> -->
                                    </div>
                                    <div class="note"><button class="btn btn-red btn-auto btn-round">{{$t('mine.area.note')}}：{{f1.AccountId}}B</button></div>
                                </div>
                            </div>
                        <!-- </div> -->
                    </div>
                    <!-- <div class="child childRow">
                        <div class="childBlock">
                            <div v-if="f4.InviteCode">
                                <div @click="query(f4.AccountId)">{{f4.Area}}</div>
                                <div @click="query(f4.AccountId)">{{f4.NickName}}</div>
                                <div @click="query(f4.AccountId)">{{f4.TotalAssets}}</div>
                                <div class="copy">
                                    <div>{{f4.InviteCode}}</div>
                                    <div><button class="btn btn-xs btn-round" v-clipboard:copy="f4.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                </div>
                            </div>
                        </div>
                        <div class="childBlock">
                            <div v-if="f5.InviteCode">
                                <div @click="query(f5.AccountId)">{{f5.Area}}</div>
                                <div @click="query(f5.AccountId)">{{f5.NickName}}</div>
                                <div @click="query(f5.AccountId)">{{f5.TotalAssets}}</div>
                                <div class="copy">
                                    <div>{{f5.InviteCode}}</div>
                                    <div><button class="btn btn-xs btn-round" v-clipboard:copy="f5.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                </div>
                            </div>
                        </div>
                        <div class="childBlock">
                            <div v-if="f6.InviteCode">
                                <div @click="query(f6.AccountId)">{{f6.Area}}</div>
                                <div @click="query(f6.AccountId)">{{f6.NickName}}</div>
                                <div @click="query(f6.AccountId)">{{f6.TotalAssets}}</div>
                                <div class="copy">
                                    <div>{{f6.InviteCode}}</div>
                                    <div><button class="btn btn-xs btn-round" v-clipboard:copy="f6.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                </div>
                            </div>
                        </div>
                        <div class="childBlock">
                            <div v-if="f7.InviteCode">
                                <div @click="query(f7.AccountId)">{{f7.Area}}</div>
                                <div @click="query(f7.AccountId)">{{f7.NickName}}</div>
                                <div @click="query(f7.AccountId)">{{f7.TotalAssets}}</div>
                                <div class="copy">
                                    <div>{{f7.InviteCode}}</div>
                                    <div><button class="btn btn-xs btn-round" v-clipboard:copy="f7.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <!-- 三个按钮 -->
            <div class="foot-botton">
                <router-link :to="{ path: '/discovery/bill', query: { type: '7' }}"><button class="btn  btn-block btn-round">{{$t("mine.area.achievement")}}</button></router-link>
                <router-link to="/discovery/withdrawal"><button class="btn  btn-block btn-round">{{$t("mine.menus.withdrawal")}}</button></router-link>
                <div><button @click="GetMyChildList" class="btn  btn-block btn-round">{{$t("mine.area.mychild")}}</button></div>
            </div>
        </div>
        <!-- 我的直推 -->
		<Modal v-model="show" :closable="true" align="center" :mask-closable="true" cancel-text=''>
			<h2>{{$t("mine.area.mychild")}}</h2>
			<div class="modal-body content">
                <Table height="300" :columns="coltitle" :data="MyChildList"></Table>
            </div>
			<!-- <div slot="footer">
				<button class="btn btn-block btn-round" @click="ok()">{{$t('wallet.send.auth')}}</button>
			</div> -->
		</Modal>

        <!-- 查看链接 -->
        <Modal v-model="showViewLink" :closable="true" align="center" :mask-closable="true" cancel-text='' :ok-text="this.$t('global.close')">
			<div class="w-cont" id="extension">
                <div class="invitecode">
                    <p><i class="iconfont icon-feiji"></i>{{$t('mine.extension.invitecode')}}</p>
                    <p>{{VInviteCode}}</p>
                    <p>{{$t('mine.area.note')}}：{{VNoteCode}}</p>
                </div>
                <div class="ercode">
                    <qriously class="ercode" :value="`http://belden-bdc.net/register/index.html?InviteCode=`+VInviteCode+`&NoteCode=`+VNoteCode" :size="138"/>
                </div>
                <div class="InviteCode">
                    <span v-text="`http://belden-bdc.net/register/index.html?InviteCode=`+VInviteCode+`&NoteCode=`+VNoteCode"></span>
                    <button type="button" class="btn btn-xs btn-round" v-clipboard:copy="`http://belden-bdc.net/register/index.html?InviteCode=`+InviteCode+`&NoteCode=`+VNoteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('wallet.receive.copy')}}</button>
                </div>
            </div>
            <div class="center mr20">
                <button @click="save()" class="btn btn-block btn-round">{{$t('wallet.receive.save')}}</button>
            </div>
		</Modal>
        <!-- <v-footer :isIndex="$route.meta.isIndex"></v-footer> -->
    </div>
</template>

<script>
	export default {
		data() {
			return {
                th: [
                    {
                        title: this.$t('mine.area.area'),
                    },
                    {
                        title: this.$t('mine.area.nickname'),
                    },
                    {
                        title: 'BDC',
                    },
                    {
                        title: this.$t('mine.area.invitecode'),
                    },
                    {
                        title: this.$t('mine.area.edit'),
                    }
                ],
                coltitle:[
                    {
                        title: this.$t('mine.area.nickname'),       // 用户名
                        key: 'name',
                        width: 130,
                    },
                    {
                        title: this.$t('mine.area.num'),       //'购币量',
                        key: 'buyNum',
                        align: 'center',
                    },
                    {
                        title: this.$t('mine.area.date'),       //'注册时间',
                        key: 'createTime'
                    }
                ],
                dataList    :   [],
                NickName    :   '',         // 昵称
                InviteCode  :   '',         // 邀请码
                MyInviteCode:   '',         // 登陆用户的邀请码
                Area        :   '',         // 根节点的矿区
                V1_Count    :   '',
                V1_BDC      :   '',
                V2_Count    :   '',
                V2_BDC      :   '',         
                GroupCount  :   '',         // 团队人数
                GroupBDC    :   '',         // 团队资产
                level       :   '',         // 上一级ID
                keyword     :   '',
                f1          :   [],
                f2          :   [],
                f3          :   [],
                f4          :   [],
                f5          :   [],
                f6          :   [],
                f7          :   [],
                MyChildList :   [],         // 我的直推
                show        :   false,      // 我的直推显示
                showViewLink:   false,      // 查看链接显示
                VInviteCode :   '',         // 盒子显示的邀请码
                VNoteCode   :   '',         // 盒子显示的节点码     
			}
		},
		methods: {
            query(Info){
                this.$server.post(
                'GetAccountTreeNew',
                {
                    guid 	      :  this.$storage.get('guid'),
                    accountInfo   :  (Info)?Info:'',
                }).then(data => {
                    if(data){
                        // 判断是否有此人
                        if(!data.GroupCount){
                            this.$vux.toast.show({
                                text: this.$t('mine.area.tips.error'),
                                type: 'warn'
                            })
                            return
                        }
                        this.NickName    =   data.NickName;           // 昵称
                        this.InviteCode  =   data.InviteCode;         // 邀请码
                        this.V1_Count    =   data.V1_Count;
                        this.V1_BDC      =   data.V1_BDC;
                        this.V2_Count    =   data.V2_Count;
                        this.V2_BDC      =   data.V2_BDC;        
                        this.GroupCount  =   data.GroupCount;         // 团队人数
                        this.GroupBDC    =   data.GroupBDC;
                        this.level       =   data.ParentId;
                        let tree         =   data.TreeList;
                        this.f1 = ''
                        this.f2 = ''
                        this.f3 = ''
                        this.f4 = ''
                        this.f5 = ''
                        this.f6 = ''
                        this.f7 = ''
                        if(tree){
                            tree.forEach((ele,index) => {
                                // 循环给层级赋值（以后慢慢换吧）
                                if(ele.Level==1){
                                    this.f1 = ele
                                }
                                if(ele.Level==2&&ele.Area=='V1'){
                                    this.f2 = ele
                                }
                                if(ele.Level==2&&ele.Area=='V2'){
                                    this.f3 = ele
                                }
                                if(ele.Level==3&&ele.Area=='V1'&&this.f2.AccountId==ele.ParentId){
                                    this.f4 = ele
                                }
                                if(ele.Level==3&&ele.Area=='V2'&&this.f2.AccountId==ele.ParentId){
                                    this.f5 = ele
                                }
                                if(ele.Level==3&&ele.Area=='V1'&&this.f3.AccountId==ele.ParentId){
                                    this.f6 = ele
                                }
                                if(ele.Level==3&&ele.Area=='V2'&&this.f3.AccountId==ele.ParentId){
                                    this.f7 = ele
                                }
                            })
                        }
                    }
                })
            },
            onCopy: function (e) {
				this.$vux.toast.show({
					text: this.$t('wallet.receive.tips.success'),
					type: 'success'
				})
			},
			onError: function (e) {
				this.$vux.toast.show({
					text: this.$t('wallet.receive.tips.error'),
					type: 'warn'
				})
            },
            toRegist(InviteCode,area,pid,NoteCode){
                // InviteCode 邀请码 Area矿区  pid为顶级用户ID NoteCode矿区节点码
                // 跳转到币币兑换页面
                this.$router.push({
                    path:"/user/registinfo",
                    query:{InviteCode:InviteCode,area:area,pId:pid,NoteCode:NoteCode}
                });
            },
            ViewLink(InviteCode,area,pid,NoteCode){
                // 查看链接
                this.showViewLink   =   true
                this.VInviteCode    =   InviteCode
                this.VNoteCode      =   NoteCode
            },
            GetMyChildList(){
                // 我的直推列表
                this.$server.post(
                'GetMyChildList',
                {
                    guid 	      :  this.$storage.get('guid'),
                }).then(data => {
                    if(data){
                        this.MyChildList = data;
                        this.show = true
                    }
                })
            },
            save(){
                // 保存
				// 首先先截取base64图片
				let ref = document.getElementById('extension') // 截图区域				
				let that = this;
				this.$html2canvas(ref, {
					backgroundColor: '#ffffff'
				}).then((canvas) => {
					var image = new Image();
					image.src = canvas.toDataURL("image/webp", 1);
					var base64Str = image.src.split('base64,')[1];
					var imgPath = "fs://extension/";
					var imgName = Math.floor((Math.random() * 100) + 1) + "clip.jpg";
					var trans = api.require('trans');
					trans.saveImage({
						base64Str: base64Str, //base64字符串不能包含data:image/png;base64,前缀
						album: false,
						imgPath: imgPath,
						imgName: imgName
					}, function(ret, err) {
						if (ret.status) {
							api.saveMediaToAlbum({
								path: imgPath+imgName
							}, function(ret, err) {
								if (ret && ret.status) {
									that.$vux.toast.show({
										text: that.$t('global.success'),
										type: 'success'
									})
								} else {
									that.$vux.toast.show({
										text: that.$t('wallet.receive.tips.warn'),
										type: 'warn'
									})
								}
							});
						} else {
							that.$vux.toast.show({
								text: that.$t('wallet.receive.tips.warn'),
								type: 'warn'
							})
						}
					});
				})
			},
		},
		mounted() {
            this.query();
            this.MyInviteCode = this.$storage.get('InviteCode');
        }
	}

</script>
<style lang="scss">
.area{
    .thtitle{
        .ivu-table-cell{
            padding:0 5px !important;
            text-align: center;
            display: flex;
            justify-content: center;
        }
    }
}
</style>
<style scoped lang="scss">
@import "../../scss/views/mine/area";
</style>