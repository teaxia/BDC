<template>
	<div class="notice padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('global.article')"></x-header>
        <div class="main-container">
			<div class="title">
                <h1>{{title}}</h1>
            </div>
            <div class="time">
                <h5>{{time.substring(0,10)}}</h5>
            </div>
            <div class="content" v-html="content">
            </div>
            <div class="notice mr40" v-if="type==0">
                <div>BDC团队</div>
                <div>{{time.substring(0,10)}}</div>
            </div>
		</div>
		<v-footer :isIndex="this.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
                dataList	:	[],
                isIndex     :   '',
                title       :   '',
                time        :   '',
                content     :   '',
                type        :   '1'             // 0为系统公告 1是其他
			}
		},
		methods: {
			
		},
		mounted() {
            let Id          = this.$route.query.id;
            this.isIndex    = this.$route.query.index;
            this.type       = this.$route.query.type;
			this.$server.post(
			'GetNewsbulletinById',
			{
                jm      : this.$md5(this.$jm.jmCode+Id).toUpperCase(),
                Id      : Id
			}).then(data => {
				if(data){
                    this.title   = data.Title;
                    this.time    = data.Sendtime;
                    this.content = data.Content; 
                }
			})
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/notice";
</style>