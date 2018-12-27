<template>
    <div class="ivu-select ivu-select-single ivu-select-default">
        <div class="ivu-select-selection default">
           <Dropdown trigger="click" class="sel" placement="bottom-start" @on-click="onSelect">
                <input class="select" v-model="value" :placeholder='placeholder' v-on:input="$emit('input', $event.target.value)" />
                <DropdownMenu slot="list" class="seld" v-if="Arr">
                    <DropdownItem v-for="(v,index) in Arr" :key="index" :name="v">{{v}}</DropdownItem>
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
  }
}
</script>

<style scoped lang="scss">
.default{
    padding:5px 5px;
    .select{
        display: inline-block;
        width: 100%;
        min-height: 0.8rem!important;
        line-height: 0.8rem!important;
        color: #a2a6ab !important;
    }
}
.sel{
    width: 100%;
}
.seld{
    min-width: 450px!important;
}
.ivu-select-dropdown{
    widows: 100%;
}
</style>
