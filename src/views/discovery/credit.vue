<template>
	<div class="notice padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.credit.title')"></x-header>
        <div class="main-container">
			<v-grid class="mr30" v-for="(v,index) in dataList" :key="index">
                <div class="systeamgg" @click="go(v.link)">
                    <svg class="sicon" aria-hidden="true">
                        <use :xlink:href="`#`+v.icon"></use>
                    </svg>
                    <span>{{v.title}}</span>
                </div>
			</v-grid>
            <div class="tips mr30">
                {{$t('discovery.credit.tips')}}
            </div>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
                dataList	:	[
                    {
                        title   :   this.$t('discovery.credit.bank.cmb'),
                        link    :   'https://ccclub.cmbchina.com/mca/MPreContract.aspx?cardSel=uc&where=bk27&WT.mc_id=N3700MM1061Q530700FS',
                        icon    :   'icon-zhaoshangyinhang-',
                    },
                    {
                        title   :   this.$t('discovery.credit.bank.cmbc'),
                        link    :   'https://creditcard.cmbc.com.cn/wsv2/?enstr=ZBXUTCGbHYokaXR242HLvWQioqXE5mJuOboTSAMs3NXd1fzKBAaEgu6jFs1xBqQUZBFIsSnyjNUv4hhY9leUvDf0zUpwzTeqdPiemlVAaWjBx6G7ATx6GUbeDnf%2f2i5HOC7n6clO4Lm5YTjZ4ylYaYKtbBgWmZ%2bN27v9KAeDiSlw9naDPMJpUL7Njj1jNiDUyHfe20%2fo6YM6l6m%2b40IbocavnMOphtsnvS1MHNfnzFz83BmMJYFf6Qd9CmM4ajLwT0r4ObjFxWO0k3n9Sc87eXCYF9tZZ6WzzDPsmQRl4%2bCrqetXhIpSHg3cIj4rsPC2hTldZfM6EPQgkGfuuuZhUQ%3d%3d',
                        icon    :   'icon-minshengyinhang',
                    },
                    { 
                        title   :   this.$t('discovery.credit.bank.spdb'),
                        link    :   'https://ecentre.spdbccc.com.cn/creditcard/indexActivity.htm?data=ZF2794961&itemcode=0000001998',
                        icon    :   'icon-pufayinhang',
                    },
                    {
                        title   :   this.$t('discovery.credit.bank.cib'),
                        link    :   'https://ccshop.cib.com.cn:8010/application/cardapp/newfast/ApplyCard/toSelectCard?id=08a45a9e327d4cd6a5b2c2030404bf1b',
                        icon    :   'icon-xingyeyinhang',
                    },
                    {
                        title   :   this.$t('discovery.credit.bank.comm'),
                        link    :   'https://creditcardapp.bankcomm.com/applynew/front/apply/new/reversion/cardlist.html?trackCode=A0428102275722&commercial_id=null&telecom_id=null',
                        icon    :   'icon-jiaotongyinhang',
                    },
                ]
			}
		},
		methods: {
			go(link){
                // 调用第三方浏览器打开网页
                if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){  
                    //苹果设备 
                    api.openApp({
                        iosUrl: link,
                    });
                }else{
                    //安卓设备
                    api.openApp({
                        androidPkg: 'android.intent.action.VIEW',
                        mimeType: 'text/html',
                        uri: link
                    });
                }
            }
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/notice";
.notice{
    .fram{
        position: fixed;
        width: 100%;
        height: 100%;
        top:0;
        background:rgba(0,0,0,.8);
        z-index:99;
        -webkit-overflow-scrolling: touch;
        overflow: scroll;
    }
}
.tips{
    color:#f90;
}
</style>