<template>
<div class="card text-white mb-3" :class="darkMode ? 'bg-dark' : 'bg-light'" style="max-width: 18rem;">
    <div class="card-header" :style="{color: colors.text}">
        {{noteNumber}}
        <div v-if="!editingMode && !showCleanBtn.notes" class="note-btn-group" :style="{color: colors.primary}">
            <div class="note-btn-holder" @click="startEditing"><EditIcon class="note-btn" /></div>
            <!-- <div class="note-btn-holder"><ViewInBoxIcon class="note-btn" /></div> -->
            <div class="note-btn-holder" @click="copyToClipBoard(content)"><CopyIcon class="note-btn" /></div>
        </div>
        <div v-if="editingMode" class="note-btn-group" :style="{color: colors.primary}">
            
            <div v-if="id==0" class="note-btn-holder" @click="submitEditing"><NewNoteIcon class="note-btn" /></div>
            <div v-if="id!=0" class="note-btn-holder" @click="submitEditing"><SubmitIcon class="note-btn" /></div>
            <!-- <div class="note-btn-holder" @click="toggleNoteBox"><ViewInBoxIcon class="note-btn" /></div> -->
            <div v-if="id!=0" class="note-btn-holder" @click="cancelEditing"><CancelIcon class="note-btn" /></div>
        </div>
        <div v-if="showCleanBtn.notes && noteNumber!='New note'" class="note-btn-group" :style="{color: 'white'}">
            <div class="note-btn-holder bg-danger bg-gradient" @click="deleteNote"><DeleteIcon class="note-btn" /></div>
        </div>
    </div>
    <div class="card-body" :style="{color: colors.text}">
        <pre v-if="!editingMode" class="card-text">{{content}}</pre>
        <textarea v-if="editingMode" v-model="noteContent" class="editingArea" 
        :style="{color: colors.text, background: colors.background}">
        </textarea>
    </div>
</div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
export default {
    data(){
        return{
            noteContent: "",
            editingMode: false,
            noteNumber: ""
        }
    },
    props:{
        index: Number,
        id: String,
        content: String,
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
        ...mapMutations(["copyToClipBoard", "toggleNoteBox"]),
        startEditing(){
            this.noteContent = this.content
            this.editingMode = true
        },
        async submitEditing(){
            if(this.noteContent != "" && this.noteContent != this.content){
                var newNote = {
                    content: this.noteContent,
                }
                var requestMethod = ''
                var requestUrl = ''
                if(this.id == 0){
                    requestMethod = 'POST'
                    requestUrl = '/note'
                }
                else{
                    requestMethod = 'PUT'
                    requestUrl = '/note/' + this.id
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
                this.cancelEditing()
            }
        },
        cancelEditing(){
            this.editingMode = false
        },
        copyContentToClipBoard(){
            
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
    .note-btn-group{
        float: right;
    }
    .note-btn-holder{
        display: inline-block;
        margin-left: 10px;
        border-radius: 50%;
        background-color: rgba(133, 133, 133, 0.2);
        cursor: pointer;
    }
    .note-btn-holder:hover{
        background-color: rgba(163, 163, 163, 0.8);
    }
    .note-btn-holder:active{
        background-color: rgba(163, 163, 163, 0.5);
    }
    .note-btn{
        margin-left: 4px;
        margin-right: 4px;
        margin-bottom: 3px;
    }
    .card-body{
        overflow: auto;
    }
    .card-text{
        height: 100%;
    }
    .editingArea{
        border: none;
        resize: none;
        height: 12.4em;
        width: 100%;
        font-size: 0.8em;
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