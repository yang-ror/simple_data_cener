<template>
<div class="link-holder">
    <label class="link-index">{{index+1}}.</label>
    <div v-if="!editingMode" class="link-label" :style="{color: colors.primary}"><a :href="url" target='_blank' class="link-a" :style="{color: colors.primary}">{{title}}</a></div>
    <input v-if="editingMode" @keyup.enter="submitEditing" @keyup.esc="cancelEditing" v-model="linkTitle" :style="{color: colors.text, background: colors.background}" class="rename-input">
    <div class="link-btn-group" :style="{color: showCleanBtn.links ? 'white' : colors.primary}">
        <IconBtn action="edit" @click="startEditing" :alert='false' v-if="!editingMode && !showCleanBtn.links" />
        <IconBtn action="submit" @click="submitEditing" :alert='false' v-if="editingMode" />
        <IconBtn action="cancel" @click="cancelEditing" :alert='false' v-if="editingMode" />
        <IconBtn action="delete" @click="deleteLink" :alert='true' v-if="showCleanBtn.links" />
    </div>
</div>
</template>

<script>
import IconBtn from '../IconBtn.vue'
import { mapState } from "vuex"
export default {
    data(){
        return{
            linkTitle: "",
            editingMode: false
        }
    },
    props:{
        index: Number,
        id: String,
        title: String,
        url: String
    },
    components:{
        IconBtn
    },
    computed:{
        ...mapState(["showCleanBtn", "colors"])
    },
    methods:{
        // ...mapMutations(["copyToClipBoard"]),
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
.link-holder{
    transform: translate(0, 4px);
}
.link-index{
    margin-right: 5px;
    overflow: hidden;
}
.link-label{
    display: inline-block;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
}
.link-a{
    width: 100%;
    white-space: nowrap;
}
.link-btn-group{
    float: right;
}
.rename-input{
    border-color: #42b883;
    border-radius: 5px;
    width: 70%;
    min-width: 208px;
    transform: translate(-4px, -7px);
}
</style>