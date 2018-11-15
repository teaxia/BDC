<template>
	<div class="notice padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('global.article')"></x-header>
        <div class="main-container">
			<div class="title">
                <h1>{{title}}</h1>
            </div>
            <div class="time">
                <h5>{{time}}</h5>
            </div>
            <div class="content" v-html="content">

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
                content     :   ''
			}
		},
		methods: {
			
		},
		mounted() {
            let id          = this.$route.query.id;
            this.isIndex    = this.$route.query.index;
			this.$server.post(
			'GetNewsbulletinById',
			{
                jm      : this.$md5(this.$jm.jmCode+id).toUpperCase(),
                Id      : id
			},
			).then(data => {
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