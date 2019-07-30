<template>
  <div class="login">
    <h1 class="h1">Login</h1>
    <div class="time">
      <input type="text" name="name" v-model="name" placeholder="账号">
    </div>
    <div class="time">
      <input type="password" name="pass" v-model="pass" placeholder="密码">
    </div>
    <button @click="login">登录</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Login',
  metaInfo: {
    title: 'Login App'
  },
  data () {
    return {
      name: "",
      pass: ""
    }
  },
  mounted () {
    axios.get('/sess')
      .then((res) => console.log(res))
      .catch(err => console.log(err))
  },
  methods: {
    login () {
      if (this.name !== '' && this.pass !== '') {
        let data = {
          "name": this.name,
          "pass": this.pass
        }
        console.log(data)
        this.getUser()
      } else {
        console.log('不合格')
      }
    },
    success (res) {
      if (res.data.success){
        let data = res.data.data
        if (data) {
          console.log('登录成功')
        } else {
          console.log('登录失败')
        }
      } else {
        console.log('请求超时')
      }
    },
    getUser () {
      axios.post('/logins', data)
        .then(this.success)
      this.name = ''
      this.pass = ''
    }
  }
}
</script>
<style scoped lang="stylus">
.login
  width: 400px
  margin: 0 auto
  padding: 10px
  background: #fff
  box-sizing: border-box
  .time
    padding 10px 0
    width: 90%
    margin: 0 auto
    input
      width: 100%
      height: 39px
      vertical-align: middle
      padding: 5px 10px
      box-sizing: border-box
  button
    display: block
    width: 90%
    height: 40px
    border: none
    background: blue
    color: #fff
    margin: 10px auto 10px auto
    // box-sizing: border-box
    // margin: 0 20px
  .h1
    padding-top: 10px
    margin-bottom: 10px
    margin-left: 20px
</style>
