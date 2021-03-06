<template>
<div class="card text-white mb-3" :class="darkMode ? 'bg-dark' : 'bg-light'">
    <div class="card-header" :style="{color: colors.text}">
        {{noteNumber}}. <label class="note-date position-absolute start-50 translate-middle" v-if="id!=0" 
        :style="{color: colors.primary}">{{noteDate}}</label>
        <div class="note-btn-group" :style="{color: showCleanBtn.notes ? 'white' : colors.primary}">
            <IconBtn action="edit" @click="startEditing" :alert='false' v-if="!editingMode && !showCleanBtn.notes" />
            <IconBtn :action="id==0 ? 'new-note' : 'submit'" @click="submitEditing" :alert='false' v-if="editingMode" />
            <IconBtn action="cancel" @click="cancelEditing" :alert='false' v-if="editingMode && id!=0" />
            <IconBtn action="delete" @click="deleteNote" :alert='true' v-if="showCleanBtn.notes" />
        </div>
    </div>
    <div class="card-body" :style="{color: colors.text}">
        <pre v-if="!editingMode" class="card-text">{{content}}</pre>
        <textarea v-if="editingMode" @keyup.esc="cancelEditing" v-model="noteContent" class="editingArea" 
            :style="{color: colors.text, background: colors.background}">
        </textarea>
    </div>
</div>
</template>

<script>
import IconBtn from '../IconBtn.vue'
import { mapMutations, mapState } from "vuex"
export default {
    data(){
        return{
            noteContent: "",
            editingMode: false,
            noteNumber: "",
            noteDate: ""
        }
    },
    props:{
        index: Number,
        id: String,
        content: String,
        date: Date
    },
    components:{
        IconBtn
    },
    computed:{
        ...mapState(["showCleanBtn", "showNoteBox", "darkMode", "colors"]),
    },
    watch:{
        index(){
            this.noteNumber = this.index+1
        }
    },
    methods:{
        ...mapMutations(["toggleNoteBox"]),
        startEditing(){
            this.noteContent = this.content
            this.editingMode = true
        },
        async submitEditing(){
            if(this.noteContent != "" && this.noteContent != this.content){
                var requestMethod = ''
                var requestUrl = ''
                var newNote = {}
                if(this.id == 0){
                    requestMethod = 'POST'
                    requestUrl = '/note'
                    newNote = {
                        content: this.noteContent,
                        date: Date.now()
                    }
                }
                else{
                    requestMethod = 'PUT'
                    requestUrl = '/note/' + this.id
                    newNote = {content: this.noteContent}
                }
                const res = await fetch(requestUrl, {
                    method: requestMethod,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newNote)
                })
                const results = await res.json()
                this.id != 0 ? this.cancelEditing() : this.noteContent = ""
                this.$emit(this.id == 0 ? 'newNote' : 'editNote', results)
            }
            else{
                if(this.id != 0) this.cancelEditing()
            }
        },
        cancelEditing(){
            this.editingMode = false
        },
        async deleteNote(){
            const res = await fetch('/note/' + this.id, {
                method: 'DELETE'
            })
            if(res.ok){
                this.$emit('deleteThisNote', this.id)
            }
        }
    },
    created(){
        if(this.id == 0){
            this.noteNumber = "New note"
            this.startEditing()
        }
        else{
            this.noteNumber = this.index+1
            this.noteDate = `${new Date(this.date).getMonth() + 1}-${new Date(this.date).getDate()}-${new Date(this.date).getFullYear()}`
        }
    }
}
</script>

<style scoped>
    .card{
        height: 15em;
    }
    .card-header{
        display: inline-block;
    }
    .note-date{
        font-size: 0.8em;
        top: 21px;
    }
    .note-btn-group{
        float: right;
    }
    .card-body{
        overflow: hide;
    }
    .card-text{
        height: 12em;
    }
    .editingArea{
        border: none;
        resize: none;
        height: 12em;
        width: 100%;
        font-size: 0.85em;
    }

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-track {
        background: #d1d1d1; 
    }
    
    ::-webkit-scrollbar-thumb {
        background: #888; 
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
</style>