<template>
  <div ref="thisPanel" :style="(currentPage!=1&&currentPage==numberOfPages)? `height:${panelHeight}px` : ''">
    <AddTodoForm @newTodo="newTodo" />
    <ul class="list-group">
      <li class="list-group-item" v-for="todo in todosInCurrentPage" :key="todo._id" :style="{background: colors.bright, color: colors.text}" :class="darkMode ? 'dark-item' : 'light-item'">
        <Todo v-if="!todo.hide" :index="todo.index" @editTodo="editTodo" @deleteThisTodo="deleteTodo" :id="todo._id" :title="todo.title" :completed="todo.completed" />
      </li>
    </ul>
    <PageIndicator v-if="numberOfPages!=1" @pervious-page="goToPerviousPage" @next-page="goToNextPage" :numOfPages="numberOfPages" :currentPage="currentPage" />
  </div>
</template>

<script>
import { mapState } from "vuex"
import AddTodoForm from "../../ui/form/AddTodoForm.vue"
import PageIndicator from "../../ui/PageIndicator.vue"
import Todo from "../../ui/items/Todo.vue"
export default {
  data(){
    return{
      todos: [],
      todosToDisplay: [],
      todosInCurrentPage: [],
      itemPerPage: 20,
      currentPage: 1,
      numberOfPages: 1,
      panelHeight: 0
    }
  },
  components:{
    Todo,
    AddTodoForm,
    PageIndicator
  },
  computed:{
    ...mapState(["itemFilter", "colors", "darkMode"])
  },
  methods:{
    setPage(){
      if(this.todosToDisplay.length <= this.itemPerPage){
        this.numberOfPages = 1 
        this.todosInCurrentPage = this.todosToDisplay
      }
      else{
        this.numberOfPages = parseInt(this.todosToDisplay.length / this.itemPerPage) + 1
        this.todosInCurrentPage = this.todosToDisplay.slice((this.currentPage-1)*this.itemPerPage, 
          this.currentPage < this.numberOfPages ? (this.currentPage)*this.itemPerPage : this.todosToDisplay.length
        )
      }
    },
    goToPerviousPage(){
      if(this.currentPage > 1){
        this.currentPage--
        this.rerenderList()
      }
    },
    goToNextPage(){
      if(this.currentPage < this.numberOfPages){
        this.panelHeight = this.$refs.thisPanel.clientHeight
        this.currentPage++
        this.rerenderList()
      }
    },
    newTodo(newlTodo){
      this.todos.push(newlTodo)
      this.sortTodoList()
    },
    deleteTodo(id){
      for(let i = 0; i < this.todos.length; i++){
        if(this.todos[i]._id == id){
          this.todos.splice(i, 1)
          break
        }
      }
      this.sortTodoList()
    },
    editTodo(newTodo){
      for(let i = 0; i < this.todos.length; i++){
        if(this.todos[i]._id == newTodo._id){
          this.todos[i] = newTodo
          break
        }
      }
      this.sortTodoList()
    },
    sortTodoList(){
      this.todos.sort((a, b) => (a.timeOfStateChange < b.timeOfStateChange) ? 1 : ((b.timeOfStateChange < a.timeOfStateChange) ? -1 : 0))

      var unfinishedList = []
      var completedList = []
      var indexOfUnfinishedTodo = 1;
      var indexOfFinishedTodo = 1;
      for(let todo of this.todos){
        if(!todo.completed){
          todo.index = indexOfUnfinishedTodo++
          unfinishedList.push(todo)
        }
        else{
          todo.index = indexOfFinishedTodo++
          completedList.push(todo)
        }
      }
      this.todos = unfinishedList.concat(completedList)
      this.todosToDisplay = this.todos
      this.rerenderList()
    },
    rerenderList(){
      this.setPage()
      this.$forceUpdate()
    }
  },
  watch:{
    itemFilter(){
      this.todosToDisplay = this.itemFilter == "" ? this.todos : this.todos.filter(
        todo => todo.title.toLowerCase().includes(this.itemFilter.toLowerCase())
      )
      this.currentPage = 1
      this.setPage()
      this.$forceUpdate()
    }
  },
  async created(){
    const res = await fetch('/todo')
    const results = await res.json()
    this.todos = results
    this.sortTodoList()
    this.setPage()
  }
}
</script>

<style scoped>
.dark-item:hover{
    filter: brightness(1.2);
}
.light-item:hover{
    filter: brightness(0.9);
}
</style>