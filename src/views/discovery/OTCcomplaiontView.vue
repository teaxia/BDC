<template>
	<div class="coomplaiont padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="投诉详情"></x-header>
        <div class="main-container">
			<div class="title line">
                投诉订单号：#{{orderId}}
            </div>
            <div class="ts line">
                <div class="ts-time">投诉时间：{{CreateTime}}</div>
                <div class="ts-sh">审核时间：{{AuditTime}}</div>
                <div class="ts-status">
                    审核状态：
                    <span v-if="AuditStauts==3" class="tag tag-error">
                        拒绝
                    </span>
                    <span v-if="AuditStauts==1" class="tag tag-success">
                        审核成功
                    </span>
                    <span v-if="AuditStauts==0" class="tag tag-wran">
                        待审核
                    </span>
                </div>
            </div>
            <div class="remarks line">
                投诉内容：
                <div class="commont">
                    {{Remarks}}
                </div>
            </div>
            <div class="auditremarks">
                审核回复内容：
                <div>{{AuditRemarks}}</div>
            </div>
            <div class="img-list line" v-if="img">
                <img v-for="(v,index) in img" :key="index" :src="v" class="img">
            </div>
		</div>
    </div>
</template>

<script>
	export default {
		data() {
			return {
                Id          :   '',         //  申诉ID
                orderId     :   '',         //  订单编号
                Remarks     :   '',         //  正文
                img         :   [],         //  上传图片路径集合
                CreateTime  :   '',
                AuditRemarks:   '',         //  审核回复内容
                AuditTime   :   '',         //  审核时间
                AuditStauts :   '',         //  审核状态：0待审核，1成功，3拒绝
            }
            
        },
		methods: {
            GetComplainById(){
                this.$server.post(
                'OTC_GetComplainById',
                {
                    guid    : this.$storage.get('guid'),
                    Id      : this.Id
                }).then(data => {
                    if(data){
                        this.orderId        =   data.OrderId
                        this.Remarks        =   data.Remarks
                        this.img            =   data.fileNames
                        this.AuditRemarks   =   data.AuditRemarks
                        this.AuditTime      =   data.AuditTime
                        this.AuditStauts    =   data.AuditStauts
                        this.CreateTime     =   data.CreateTime
                    }
                })
            },
		},
		mounted() {
            this.Id = this.$route.query.id
			this.GetComplainById()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otccoomplaiontview";
</style>