<template>
<div class="file-holder">
    <label class="file-index">{{index+1}}.</label>
    <div v-if="!editingMode" class="file-label" :style="{color: colors.primary}"><a :href="url" target='_blank' class="file-a" :style="{color: colors.primary}">{{name}}</a></div>
    <input v-if="editingMode" @keyup.enter="submitEditing" @keyup.esc="cancelEditing" v-model="filename" :style="{color: colors.text, background: colors.background}" class="filename-input">
    <div class="file-btn-group" :style="{color: showCleanBtn.files ? 'white' : colors.primary}">
        <IconBtn action="edit" @click="startEditing" :alert='false' v-if="!editingMode && !showCleanBtn.files" />
        <IconBtn action="submit" @click="submitEditing" :alert='false' v-if="editingMode" />
        <IconBtn action="cancel" @click="cancelEditing" :alert='false' v-if="editingMode" />
        <IconBtn action="delete" @click="deleteFile" :alert='true' v-if="showCleanBtn.files" />
    </div>
</div>
</template>

<script>
import IconBtn from '../IconBtn.vue'
import { mapState } from "vuex"
export default {
    data(){
        return{
            filename: "",
            editingMode: false
        }
    },
    props:{
        index: Number,
        name: String,
        url: String
    },
    components:{
        IconBtn
    },
    computed:{
        ...mapState(["showCleanBtn", "colors"])
    },
    methods:{
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
.file-holder{
    transform: translate(0, 4px);
}
.file-index{
    margin-right: 5px;
    overflow: hidden;
}
.file-label{
    display: inline-block;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
}
.file-a{
    width: 100%;
    white-space: nowrap;
}
.file-btn-group{
    float: right;
}
.filename-input{
    border-color: #42b883;
    border-radius: 5px;
    width: 70%;
    min-width: 208px;
    transform: translate(-4px, -7px);
}
</style>