<template>
	<div class="otcRank margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.OTC.rank.title')"></x-header>
        <div class="podium">
            <div :class="{'podium-prize':true,'podium-0':index==1,'podium-1':index==0,'podium-2':index==2}" v-for="(v,index) in rankList" :key="index" v-if="index<3">
                <div class="ranking">
                    <svg class="sicon" aria-hidden="true" v-if="index<=2">
                        <use :xlink:href="`#icon-`+rank[index]"></use>
                    </svg>
                </div>
                <div class="podium-info">
                    <div class="rank-nickname">{{v.NickName}}</div>
                    <div class="lv">{{v.Lv}}</div>
                    <div class="total">
                        {{$t('OTC.rank.num')}}<br/>{{$numberComma(v.Total)}}
                    </div>
                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="rabklist">
                <div class="rank" v-for="(v,index) in rankList" :key="index" v-if="index>2">
                    <div :class="{'ranking':true}">
                        {{index+1}}
                    </div>
                    <div :class="{'nickname':true}">
                        <span class="rank-nickname">{{v.NickName}}</span>
                        <span class="lv">{{v.Lv}}</span>
                    </div>
                    <div :class="{'total':true}">
                        {{$t('OTC.rank.num')}}:{{$numberComma(v.Total)}}
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
@import "../../scss/views/otc/otcRank";
</style>