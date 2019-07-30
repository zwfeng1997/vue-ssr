<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <Footer></Footer>
    <div>aaaa</div>
    <router-view/>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.vue'
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import { constants } from 'crypto';

export default {
  name: 'App',
  metaInfo: {
    title: 'App'
  },
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['fullName'])
  },
  methods: {
    ...mapMutations(['updataCount']),
    ...mapActions(['updataCountSync']),
    notify () {
      var a = this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
      console.log(a)
    }
  },
  data () {
    return {
      test: 'laaa'
    }
  }
}
</script>

<style lang="stylus" scoped>
#app
  position absolute
  left 0
  right 0
  top 0
  bottom 0
    #cover
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      background-color #999
      opacity 0.2
      z-index -1
</style>
