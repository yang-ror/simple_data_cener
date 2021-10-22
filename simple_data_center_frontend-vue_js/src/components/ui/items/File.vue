<template>
<div>
    {{index+1}}. 
    <a v-if="!editingMode" :href="url" target='_blank' :style="{color: colors.primary}">{{name}}</a>
    <input v-if="editingMode" @keyup.enter="submitEditing" v-model="filename" :style="{color: colors.text, background: colors.background}" class="rename-input">
    <div v-if="!editingMode && !showCleanBtn.files" class="file-btn-group" :style="{color: colors.primary}">
        <!-- <div class="file-btn-holder"><ShowInMediaIcon class="file-btn" /></div> -->
        <div class="file-btn-holder" @click="startEditing"><RenameIcon class="file-btn" /></div>
        <div class="file-btn-holder" @click="copyToClipBoard(url)"><CopyIcon class="file-btn" /></div>
    </div>
    <div v-if="editingMode" class="file-btn-group" :style="{color: colors.primary}">
        <div class="file-btn-holder" @click="submitEditing"><SubmitIcon class="file-btn" /></div>
        <div class="file-btn-holder" @click="cancelEditing"><CancelIcon class="file-btn" /></div>
    </div>
    <div v-if="showCleanBtn.files" class="file-btn-group" :style="{color: 'white'}">
        <div class="file-btn-holder bg-danger bg-gradient" @click="deleteFile"><DeleteIcon class="file-btn" /></div>
    </div>
</div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
export default {
    data(){
        return{
            filename: "",
            editingMode: false
        }
    },
    computed:{
        ...mapState(["showCleanBtn", "colors"])
    },
    props:{
        index: Number,
        name: String,
        url: String
    },
    methods:{
        ...mapMutations(["copyToClipBoard"]),
        startEditing(){
            this.filename = this.name
            this.editingMode = true
        },
        async submitEditing(){
            if(this.filename != ""){
                const res = await fetch('/file/' + this.name, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.filename
                    })
                })
                const results = await res.json()
                results.oldName = this.name
                this.$emit('renameFile', results)
            }
            this.cancelEditing()
        },
        cancelEditing(){
            this.editingMode = false
        },
        async deleteFile(){
            const res = await fetch('/file/' + this.name, {
                method: 'DELETE'
            })
            if(res.ok){
                this.$emit('deleteThisFile', this.name)
            }
        }
    }
}
</script>

<style scoped>
.file-btn-group{
    float: right;
}
.file-btn-holder{
    display: inline-block;
    margin-left: 10px;
    border-radius: 50%;
    background-color: rgba(133, 133, 133, 0.2);
    cursor: pointer;
}
.file-btn{
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 3px;
}
.file-btn-holder:hover{
    background-color: rgba(163, 163, 163, 0.8);
}
.file-btn-holder:active{
    background-color: rgba(163, 163, 163, 0.5);
}
.rename-input{
    border-color: #42b883;
    border-radius: 5px;
    width: 50%;
    min-width: 208px;
}
</style>