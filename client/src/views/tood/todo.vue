<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么"
      @keyup.enter='addTodo'
    >
    <item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo._id"
      @del="deleteTodo"
    />
    <tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>
<script>
import axios from 'axios'
import Item from './item.vue'
import Tabs from './tats.vue'
export default {
  name: 'Todo',
  metaInfo: {
    title: 'Todo App'
  },
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  components: {
    Item,
    Tabs
  },
  asyncData (router) {
    return new Promise((resolve,rejected) => {
      resolve(
        axios.get('http://localhost:3000/list')
          .then( (res) => {
            if (res.data.success){
              // let data = res.data.data
              // this.todos = data
              // data = JSON.stringify(data)
              // console.log(data)
            }
          })
          .catch((err) => console.log(err))
      )
      rejected('err')
    })
  },
  mounted () {
    this.getTodos()
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      let value = e.target.value.trim()
      let data = {
        "content": value,
        "completed": false
      }
      axios.post('/add', data)
        .then(this.put)
        .catch((err) => console.log(err))
      e.target.value = ''
    },
    deleteTodo (id) {
      let data = {
        "id": id
      }
      axios.delete('/delete/' + id,data)
        .then(this.put)
    },
    putTodo (id, completed) {
      let data = {
        "completed": completed
      }
      axios.put('/put/' + id, data)
        .then(this.put)
    },
    deleteIfTodo () {
      axios.delete('/deleteif')
        .then(this.put)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    createTodos (res) {
      if (res.data.success){
        let data = res.data.data
        this.todos = data
        console.log(this.todos + 'aaaaaaaaaa')
      }
      // console.log(res.data)
    },
    getTodos () {
      let data
      axios.get('/list')
        .then( data => this.createTodos(data))
        .catch((err) => console.log(err))
    },
    put (res) {
      if (res.data.success){
        this.getTodos()
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.real-app
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666

.add-input
  position relative
  margin 0
  width 100%
  font-size 24px
  font-family inherit
  font-weight inherit
  line-height 1.4em
  border none
  outline none
  color inherit
  box-sizing border-box
  font-smoothing antialiased
  padding 16px 16px 16px 36px
  border none
  box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
</style>

