<template>

<div>
    {{index+1}}. 
    <a v-if="!editingMode" :href="url" target='_blank' :style="{color: colors.primary}">{{title}}</a>
    <input v-if="editingMode" @keyup.enter="submitEditing" v-model="linkTitle" :style="{color: colors.text, background: colors.background}" class="rename-input">
    <div v-if="!editingMode && !showCleanBtn.links" class="link-btn-group" :style="{color: colors.primary}">
        <div class="link-btn-holder" @click="startEditing"><RenameIcon class="link-btn" /></div>
        <div class="link-btn-holder" @click="copyToClipBoard(url)"><CopyIcon class="link-btn" /></div>
    </div>
    <div v-if="editingMode" class="link-btn-group" :style="{color: colors.primary}">
        <div class="link-btn-holder" @click="submitEditing"><SubmitIcon class="link-btn" /></div>
        <div class="link-btn-holder" @click="cancelEditing"><CancelIcon class="link-btn" /></div>
    </div>
    <div v-if="showCleanBtn.links" class="link-btn-group" :style="{color: 'white'}">
        <div class="link-btn-holder bg-danger bg-gradient" @click="deleteLink"><DeleteIcon class="link-btn" /></div>
    </div>
</div>

</template>

<script>
import { mapMutations, mapState } from "vuex"
export default {
    data(){
        return{
            linkTitle: "",
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
        url: String
    },
    methods:{
        ...mapMutations(["copyToClipBoard"]),
        startEditing(){
            this.linkTitle = this.title
            this.editingMode = true
        },
        async submitEditing(){
            if(this.linkTitle != ""){
                var newLink = {
                    title: this.linkTitle,
                    url: this.url
                }
                const res = await fetch('/link/' + this.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newLink)
                })
                const results = await res.json()
                if(res.ok) this.$emit('editLink', results)
            }
            this.cancelEditing()
        },
        cancelEditing(){
            this.editingMode = false
        },
        async deleteLink(){
            const res = await fetch('/link/' + this.id, {
                method: 'DELETE'
            })
            if(res.ok){
                this.$emit('deleteThisLink', this.id)
            }
        }
    }
}
</script>

<style scoped>
.link-btn-group{
    float: right;
}
.link-btn-holder{
    display: inline-block;
    margin-left: 10px;
    border-radius: 50%;
    background-color: rgba(133, 133, 133, 0.2);
    cursor: pointer;
}
.link-btn{
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 3px;
}
.link-btn-holder:hover{
    background-color: rgba(163, 163, 163, 0.8);
}
.link-btn-holder:active{
    background-color: rgba(163, 163, 163, 0.5);
}
.rename-input{
    border-color: #42b883;
    border-radius: 5px;
    width: 50%;
    min-width: 208px;
}
</style>