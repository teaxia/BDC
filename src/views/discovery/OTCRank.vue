<template>
	<div class="otcRank margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.OTC.rank.title')"></x-header>
        <div class="main-container">
            <div class="rabklist">
                <div class="rank">
                    <div class="ranking"></div>
                    <div class="nickname">{{$t('discovery.OTC.rank.title')}}</div>
                    <div class="total">{{$t('discovery.OTC.rank.num')}}</div>
                </div>
                <div class="rank" v-for="(v,index) in rankList" :key="index">
                    <div class="ranking">
                        <svg class="sicon" aria-hidden="true" v-if="index<=2">
                            <use :xlink:href="`#icon-`+rank[index]"></use>
                        </svg>
                    </div>
                    <div :class="{nickname:true,'lv-1':index==0,'lv-2':index==1,'lv-3':index==2}">
                        <span class="rank-nickname">{{v.NickName}}</span>
                        <span class="lv">{{v.Lv}}</span>
                    </div>
                    <div :class="{total:true,'lv-1':index==0,'lv-2':index==1,'lv-3':index==2}">
                        {{$numberComma(v.Total)}}
                    </div>
                </div>
            </div>
        </div>
		
        <!-- <v-footer :isIndex="$route.meta.isIndex"></v-footer> -->
    </div>
</template>

<script>
	export default {
        name:'otcRank',
		data() {
			return {
                rankList    :   [],         // 排行榜数据
                rank:[
                    'jinpai-copy-copy',
                    'yinpai',
                    'tongpai',
                ]
			}
        },
        watch:{
            
        },
		methods: {
			getRank(){
                this.$server.post(
                'GetRankingList',{
                    guid 	    :   this.$storage.get('guid'),
                }).then(data => {
                    if(data){
                        this.rankList = data
                    }
                }) 
            }
		},
		mounted() {
            this.getRank()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otcRank";
</style>