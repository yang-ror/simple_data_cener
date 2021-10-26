<template>
<div class="media-holder position-relative" :class="type == 'image' ? 'image-holder' : ''" @click="showCleanBtn.media ? deleteMedia() : showMedia()" :style="backgroundProperties">
    <div class="media-info-holder">
        <label class="media-id text-truncate">{{mediaNumber}}</label>
        <label class="dot text-truncate" v-if="type!='upload'">.</label>
        <label class="media-name text-truncate" v-if="type!='upload'">{{name}}</label>
    </div>
    <UploadIcon v-if="type=='upload'" class="upload-icon position-absolute top-50 start-50 translate-middle" />
    <AudioPlayer v-if="type=='audio'" :url="url" />
    <div class="trash-icon-holder position-absolute top-50 start-50 translate-middle"><TrashIcon v-if="showCleanBtn.media && type!='upload'" class="delete-icon" /></div>
</div>
</template>

<script>
import { mapState } from "vuex"
import { AudioPlayer } from './AudioPlayer.vue'
export default {
    data(){
        return{
            backgroundProperties: {
                background: "#555555",
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            },
            mediaNumber: "",
            urlForDisplay: ""
        }
    },
    props:{
        index: Number,
        name: String,
        type: String,
        url: String
    },
    components:{
        AudioPlayer
    },
    methods:{
        showMedia(){
            console.log(this.name)
            console.log(this.url)
            console.log(this.backgroundProperties)
        },
        fixedEncodeURIComponent(str) {
            return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
                return '%' + c.charCodeAt(0).toString(16)
            })
        },
        async deleteMedia(){
            const res = await fetch('/file/' + this.name, {
                method: 'DELETE'
            })
            if(res.ok){
                this.$emit('deleteThisFile', this.name)
            }
        }
    },
    computed:{
        ...mapState(["showCleanBtn", "showCleanBtn", "darkMode"])
    },
    watch:{
        url(){
            if(this.type == "image"){
                this.backgroundProperties.backgroundImage = `url(${this.fixedEncodeURIComponent(this.url)})`
            }
        }
    },
    created(){
        if(this.type == 'upload'){
            this.mediaNumber = "Upload"
        }
        else{
            this.urlForDisplay = this.fixedEncodeURIComponent(this.url)
            if(this.type == "image"){
                this.backgroundProperties.backgroundImage = `url(${this.urlForDisplay})`
            }
            this.mediaNumber = this.index+1
        }   
    }
}
</script>

<style scoped>
.media-holder{
    min-height: 200px;
    max-height: 200px;
    min-width: 200px;
    max-width: 200px;
    border-radius: 5px;
    cursor: pointer;
}
.image-holder:hover{
    filter: brightness(75%);
}
.media-info-holder{
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px 5px 0px 0px;
    /* overflow: hidden; */
    vertical-align: text-top;
}
.index-holder{
    display: inline-block;
}
.media-id{
    margin-left: 5px;
    color: white;
}
.dot{
    color: white;
}
.media-name{
    color: #42b883;
    margin-left: 5px;
    width: 165px;
    white-space: nowrap;
}
.upload-icon{
    font-size: 5em;
    color: #42b883;
}
.trash-icon-holder{
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
}
.delete-icon{
    margin: 10px;
    font-size: 3em;
    color: #ff5d5d;
}
</style>