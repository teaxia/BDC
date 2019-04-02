<template>
	<div class="notice padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="BDC操作指南"></x-header>
        <div class="main-container">
			<Collapse v-model="value" accordion>
                <Panel name="1">
                    新用户如何注册？
                    <p slot="content">
                        注册可以通过个人中心-推广分享链接注册或者打开BDC的APP进行注册，注册时请认真填写注册信息及推荐人的推广码，选择您所想要在的矿区，V1或V2并妥善保管账户信息。新注册账户在48小时内账户持有BDC固定资产少于50枚，系统将冻结该账户。
                    </p>
                </Panel>
                <Panel name="2">
                    如何获得BDC？
                    <p slot="content">
                        进入我的个人中心-兑换BDC，目前获得BDC有以下两种方式：<br/>
                        1.币币兑换：点击兑换BDC选择币币兑换，目前支持以太坊和比特币兑换BDC，兑换价格按照以太坊、比特币的实时价格进行换算。<br/>
                        2.现金兑换：点击兑换BDC选择现金兑换，输入您需要兑换的BDC数量，系统将自动换算出您需要支付多少金额。选择您的支付方式-备注付款人姓名-确认即可兑换BDC。<br/>
                    </p>
                </Panel>
                <Panel name="3">
                    如何推广BDC？
                    <p slot="content">
                        每个账户拥有独立的推广链接以及推广码，推广码用于矿队成员注册时填写，注册可通过以下3种方式：<br/>
                        1.进入我的个人中心-矿区查看V1、V2矿区的矿队成员，可直接在该矿队成员下面“添加”直接进行注册；<br/>
                        2.进入我的个人中心-推广，将二维码截屏发送给预注册的矿队成员，他将通过扫描二维码，在APP登入页面进行注册；<br/>
                        3.进入我的个人中心-推广，复制您专属的推广链接发送给预注册的矿队成员进行注册，注册成功后可在注册页面直接下载BDC的APP。
                    </p>
                </Panel>
                <Panel name="4">
                    BDC钱包用途
                    <p slot="content">
                        固定资产--您兑换的BDC母币，用于计算当前账户的每日算力。<br/>
                        通证资产--通证资产是由固定资产每日算力产生，资产来源包含固定资产算力、推广算力、领导算力、通证资产每日利息。<br/>
                        游戏钱包--游戏钱包只能与通证资产之间互相转换，当通证资产转换到游戏钱包时，将按BDC当前价格换算成对应的法币金额，兑换比例1：1.1，从游戏钱包转回通证资产时，兑换比例1.15：1<br/>
                    </p>
                </Panel>
                <Panel name="5">
                    BDC可以互转吗？
                    <p slot="content">
                        每个账户拥有独立的32位字节收币地址，进行转币时粘贴对方的收币地址，填入需要转账的BDC数量，选择转账的资产类型“固定资产or通证资产”。
                    </p>
                </Panel>
                <Panel name="6">
                    可以将BDC转入其它冷钱包吗？
                    <p slot="content">
                        将通证资产的币提到交易大盘或Im’Token钱包时，需要输入您的收币地址，填写您的BDC数量即可将您通证资产钱包里的BDC提到交易大盘或Im’Token钱包。
                    </p>
                </Panel>
            </Collapse>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				value: '1'
			}
		},
		methods: {
			
		},
		mounted() {

		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/notice";
</style>