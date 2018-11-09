<template>
	<div class="appindex" v-cloak>
        <!-- <x-header title="slot:overwrite-title">
            <div class="overwrite-title" slot="overwrite-title">
                <div @click="change()" :class="{'overwrite-title-btn':true,'overwrite-title-first':true,'overwrite-title-act':active}">{{$t("application.title.buy")}}</div>
                <div @click="change()" :class="{'overwrite-title-btn':true,'overwrite-title-last':true,'overwrite-title-act':!active}">{{$t("application.title.shop")}}</div>
            </div>
        </x-header> -->
        <div class="main-container">
            <h1>{{$t("menu.application")}}</h1>
            <div class="select">
                <div @click="change()" :class="{'select-title':true}">
                    <span :class="{'select-act':active}">{{$t("application.title.buy")}}</span>
                </div>
                <div @click="change()" :class="{'select-title':true}">
                    <span :class="{'select-act':!active}">{{$t("application.title.shop")}}</span>
                </div>
            </div>
            <div class="mr30">
                <v-grid>
                    <div class="pd-lb20">
                        <flexbox>
                            <flexbox-item :span="3">
                                <div class="dis-grid-img">
                                    图片
                                </div>
                            </flexbox-item>
                            <flexbox-item>
                                <div class="dis-grid-content line-b">
                                    <div class="title ellipsis1">标题</div>
                                    <div class="content ellipsis2">文字</div>
                                </div>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </v-grid>
            </div>
        </div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
        name:'application',
		data() {
			return {
				active      :    true,                             //头部切换索引
			}
        },
        watch:{
            active(){
                console.log(this.active);
            }
        },
		methods: {
			change(){
                this.active = !this.active;
            }
		},
		mounted() {
            
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/application/appindex";
</style>