<template>
    <div class="ivu-select ivu-select-single ivu-select-default">
        <div class="ivu-select-selection default">
           <Dropdown trigger="click" class="sel" placement="bottom-start" @on-click="onSelect" id="sel">
                <input class="select" v-model="value" :placeholder='placeholder' v-on:input="$emit('input', $event.target.value)" />
                <DropdownMenu slot="list" class="seld" v-if="Arr">
                    <DropdownItem v-for="(v,index) in Arr" :key="index" :style="`width:`+w+`px;`" :name="v">{{v}}</DropdownItem>
                </DropdownMenu>
           </Dropdown>
        </div>
    </div>
</template>

<script>
export default {
  name:'vselect',
  props: {
      Arr           :   Array,              //  下拉选项数组['数组名','数组名'] 
      placeholder   :   String,             //  输入框占位符
  },
  data () {
    return {
      value     :   '',
      w         :   '',                     // 输入框的宽度
    }
  },
  methods:{
    onSelect(name){
        this.value = name;
    }
  },
  watch:{
      data(){
          //console.log(data)
      }
  },
  mounted(){
      this.w = document.getElementById("sel").offsetWidth
  }
}
</script>

<style scoped lang="scss">
.default{
    padding:5px 5px;
    .select{
        display: inline-block;
        width: 100%;
        height:100%;
        overflow: hidden;
        min-height: 100%!important;
        line-height: 100%!important;
        color: #a2a6ab !important;
    }
}
.sel{
    width: 100%;
    height: 100%;
}
.seld{
    width: 100%!important;
    max-height: 200px;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
}
.ivu-select-dropdown{
    width: 100%;
}
</style>
