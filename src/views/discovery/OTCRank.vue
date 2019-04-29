<template>
	<div class="otcRank margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="排行榜"></x-header>
        <div class="main-container">
            <div class="rabklist">
                <div class="rank">
                    <div class="ranking">等级</div>
                    <div class="nickname">昵称（等级）</div>
                    <div class="total">接单BDC总数</div>
                </div>
                <div class="rank" v-for="(v,index) in rankList" :key="index">
                    <div class="ranking">
                        <svg class="sicon" aria-hidden="true" v-if="index<=2">
                            <use :xlink:href="`#icon-`+rank[index]"></use>
                        </svg>
                        <span v-else>{{index}}</span>
                    </div>
                    <div :class="{nickname:true,'lv-1':index==0,'lv-2':index==1,'lv-3':index==2}">
                        {{v.NickName}}
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
                        console.log(data)
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