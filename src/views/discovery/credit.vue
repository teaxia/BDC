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
        <div v-if="show" class=fram>
            <iframe :src="golink" class="iframe" frameborder="0">
            </iframe>
            <div class="btnclose">
                <button @click="close()" class="btn btn-block btn-round mr30">{{$t('global.close')}}</button>
            </div>
        </div>
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
                        link    :   'https://ccclub.cmbchina.com/mca/MPreContract.aspx?cardSel=uc&where=bk27&WT.mc_id=N3700MM1061Q530700FS',
                        icon    :   'icon-pufayinhang',
                    },
                    {
                        title   :   this.$t('discovery.credit.bank.cib'),
                        link    :   'https://ccclub.cmbchina.com/mca/MPreContract.aspx?cardSel=uc&where=bk27&WT.mc_id=N3700MM1061Q530700FS',
                        icon    :   'icon-xingyeyinhang',
                    },
                    {
                        title   :   this.$t('discovery.credit.bank.comm'),
                        link    :   'https://ccclub.cmbchina.com/mca/MPreContract.aspx?cardSel=uc&where=bk27&WT.mc_id=N3700MM1061Q530700FS',
                        icon    :   'icon-jiaotongyinhang',
                    },
                ],
                golink		:	'',
			    show		:	false,
			}
		},
		methods: {
			go(link){
                this.show = true;
                this.golink = link;
            },
            close(){
                this.show = false;
            }
		},
		mounted() {
			
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/notice";
.fram{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    background:rgba(0,0,0,.8);
    z-index:99;
}
.iframe{
    width: 100%;
    height: 85%;
}
.btnclose{
    width: 50%;
    margin:0  auto;
}
.tips{
    color:#f90;
}
</style>