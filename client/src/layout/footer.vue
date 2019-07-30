<template>
  <div id="footer">
    <span>Written by {{ author }}</span>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data () {
    return {
      author: 'ZhouWeiFeng'
    }
  }
}
</script>
<style scoped lang="stylus">
#footer
  margin-top 0px
  text-align center
  color #bfbfbf
  font-size 50px
  text-shadow 0 1px 0  #ffffff
</style>
