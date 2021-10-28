<template>
<div class="todo-holder">
    <input class="form-check-input" type="checkbox" v-model="isCompleted" @click="toogleComplete">
    <label class="todo-index">{{index}}.</label>
    <label v-if="!editingMode" :class="isCompleted ? 'completed-todo' : ''" :style="{color: colors.primary, textDecorationColor: colors.secondary}" class="todo-label">{{title}}</label>
    <input v-if="editingMode" @keyup.enter="submitEditing" @keyup.esc="cancelEditing" v-model="todoTitle" :style="{color: colors.text, background: colors.background}" class="todo-input">
    <div class="todo-btn-group" :style="{color: showCleanBtn.todo ? 'white' : colors.primary}">
        <IconBtn action="edit" @click="startEditing" :alert='false' v-if="!editingMode && !showCleanBtn.todo" />
        <IconBtn action="submit" @click="submitEditing" :alert='false' v-if="editingMode" />
        <IconBtn action="cancel" @click="cancelEditing" :alert='false' v-if="editingMode" />
        <IconBtn action="delete" @click="deleteTodo" :alert='true' v-if="showCleanBtn.todo" />
    </div>
</div>

</template>

<script>
import { mapMutations, mapState } from "vuex"
import IconBtn from '../IconBtn.vue'
export default {
    data(){
        return{
            todoTitle: "",
            isCompleted: false,
            editingMode: false
        }
    },
    props:{
        index: Number,
        id: String,
        title: String,
        completed: Boolean
    },
    components:{
        IconBtn
    },
    computed:{
        ...mapState(["showCleanBtn", "colors"])
    },
    methods:{
        ...mapMutations(["copyToClipBoard"]),
        startEditing(){
            this.todoTitle = this.title
            this.editingMode = true
        },
        async submitEditing(){
            if(this.todoTitle != ""){
                var newTodo = {
                    title: this.todoTitle,
                }
                const res = await fetch('/todo/' + this.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTodo)
                })
                const results = await res.json()
                if(res.ok){ 
                    // this.title = this.todoTitle
                    this.$emit('editTodo', results)
                }
            }
            this.cancelEditing()
        },
        cancelEditing(){
            this.editingMode = false
        },
        async toogleComplete(){
            var newTodo = {
                // title: this.title,
                completed: !this.completed,
                timeOfStateChange: Date.now()
            }
            const res = await fetch('/todo/' + this.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodo)
            })
            const results = await res.json()
            if(res.ok){
                this.$emit('editTodo', results)
            }
        },
        async deleteTodo(){
            const res = await fetch('/todo/' + this.id, {
                method: 'DELETE'
            })
            if(res.ok){
                this.$emit('deleteThisTodo', this.id)
            }
        }
    },
    created(){
        this.isCompleted = this.completed
    }
}
</script>

<style scoped>
.todo-holder{
    transform: translate(0, 4px);
}
.form-check-input{
    cursor: pointer;
}
.todo-btn-group{
    float: right;
}
.todo-index{
    margin-left: 10px;
    margin-right: 5px;
    overflow: hidden;
}
.todo-label{
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.todo-input{
    border-color: #42b883;
    border-radius: 5px;
    width: 70%;
    min-width: 208px;
    transform: translate(-4px, -7px);
}
.completed-todo{
    text-decoration: line-through;
}
</style>