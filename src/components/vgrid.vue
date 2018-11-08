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
    padding:10px 0;
    border:0.01rem solid $border-base;
    border-radius: 15px;
    box-shadow: 0 0 25px 0 $border-base;
}
</style>
