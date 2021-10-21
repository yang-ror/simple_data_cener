<template>
  <div class="input-group mb-3">
  <input type="url" class="form-control" v-model="todoTitle" @keyup.enter="addTodo" :style="{background: colors.bright, color: colors.text}">
  <button class="btn btn-outline-secondary" @click="addTodo" :style="{background: colors.secondary, color: colors.text}">Add Todo</button>
</div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data(){
    return{
      todoTitle: ""
    }
  },
  computed:{
    ...mapState(["colors"])
  },
  methods:{
    async addTodo(){
      if(this.todoTitle != ""){
        var newTodo = {
          title: this.todoTitle
        }
        const res = await fetch('/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTodo)
        })
        const results = await res.json()
        this.todoTitle = ""
        this.$emit('newTodo', results)
      }
    }
  }
}
</script>

<style>

</style>