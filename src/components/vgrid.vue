<template>
  <div class="grid">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'vfooter',
  props: ["isIndex","cols"],
  data () {
    return {
      
    }
  },
  mounted(){
    
  }
}
</script>

<style scoped lang="scss">
@import "../scss/base/var";
.grid{
    height: auto;
    overflow: hidden;
    border:0.01rem solid #dadbde;
    padding:10px 0;
    border-radius: 10px;
    box-shadow:  0px 2px 6px #dadbde;
}
</style>
