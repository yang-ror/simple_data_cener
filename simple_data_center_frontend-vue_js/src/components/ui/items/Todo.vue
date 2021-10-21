<template>
<li class="list-group-item" :style="{background: colors.bright, color: colors.text}">
    <input class="form-check-input" type="checkbox" v-model="isCompleted" @click="toogleComplete">
    {{index+1}}. 
    <label v-if="!editingMode && !isCompleted" target='_blank' :style="{color: colors.primary}">{{title}}</label>
    <s v-if="!editingMode && isCompleted" target='_blank' :style="{color: colors.primary}">{{title}}</s>
    <input v-if="editingMode" v-model="todoTitle" :style="{color: colors.text, background: colors.background}" class="rename-input">
    <div v-if="!editingMode && !showCleanBtn.todo" class="todo-btn-group" :style="{color: colors.primary}">
        <div class="todo-btn-holder" @click="startEditing"><RenameIcon class="todo-btn" /></div>
    </div>
    <div v-if="editingMode" class="todo-btn-group" :style="{color: colors.primary}">
        <div class="todo-btn-holder" @click="submitEditing"><SubmitIcon class="todo-btn" /></div>
        <div class="todo-btn-holder" @click="cancelEditing"><CancelIcon class="todo-btn" /></div>
    </div>
    <div v-if="showCleanBtn.todo" class="todo-btn-group" :style="{color: 'white'}">
        <div class="todo-btn-holder bg-danger bg-gradient" @click="deleteTodo"><DeleteIcon class="todo-btn" /></div>
    </div>
</li>
</template>

<script>
import { mapMutations, mapState } from "vuex"
export default {
    data(){
        return{
            todoTitle: "",
            isCompleted: false,
            editingMode: false
        }
    },
    computed:{
        ...mapState(["showCleanBtn", "colors"])
    },
    props:{
        index: Number,
        id: String,
        title: String,
        completed: Boolean
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
                title: this.title,
                completed: !this.completed
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
                // this.isCompleted = !this.completed
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
.todo-btn-group{
    float: right;
}
.todo-btn-holder{
    display: inline-block;
    margin-left: 10px;
    border-radius: 50%;
    background-color: rgba(133, 133, 133, 0.2);
    cursor: pointer;
}
.todo-btn{
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 3px;
}
.todo-btn-holder:hover{
    background-color: rgba(163, 163, 163, 0.8);
}
.todo-btn-holder:active{
    background-color: rgba(163, 163, 163, 0.5);
}
.rename-input{
    border-color: #42b883;
    border-radius: 5px;
    width: 50%;
    min-width: 208px;
}
</style>