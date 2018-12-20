<template>
	<div class="notice padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="name"></x-header>
        <div class="main-container">
			<div class="title">
                <h1>{{title}}</h1>
            </div>
            <div class="time">
                <h5>{{time}}</h5>
            </div>
            <div class="content" v-html="content">
            </div>
            <div class="notice mr40" v-if="type==3||type==2">
                <div>BDC团队</div>
                <div>{{time}}</div>
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
                name        :   '',
                type        :   1             // 1文章 2站内信 3系统公告
			}
		},
		methods: {
			GetNewsbulletinById(Id){
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
            },
            GetLetterMessagInfo(Id){
                this.$server.post(
                'GetLetterMessagInfo',
                {
                    guid    : this.$storage.get('guid'),
                    MsgId   : Id
                }).then(data => {
                    if(data){
                        this.title   = data.Subject;
                        this.time    = data.SentTime;
                        this.content = data.MessageText; 
                    }
                })
            }
		},
		mounted() {
            let Id          = this.$route.query.id;
            this.isIndex    = this.$route.query.index;
            this.type       = (this.$route.query.type)?this.$route.query.type:1;
            switch(this.type){
                case 1:     // 文章
                    this.name = this.$t('global.article')
                    this.GetNewsbulletinById(Id);
                break;
                case 2:     // 站内信
                    this.name = this.$t('global.message')
                    this.GetLetterMessagInfo(Id);
                break;
                case 3:     // 公告
                    this.name = this.$t('global.notice')
                    this.GetNewsbulletinById(Id);
                break;
            }
			
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/notice";
</style>