<template>
<div class="player">
    <audio controls v-if="type=='audio'" class="position-absolute top-50 start-50 translate-middle" >
        <source :src="url" :type="mediaType">
        Your browser does not support the audio tag.
    </audio>
    <video controls v-if="type=='video'" class="position-absolute top-50 start-50 translate-middle" >
        <source :src="url" :type="mediaType">
        Your browser does not support the audio tag.
    </video>
</div>
</template>

<script>
export default {
    data(){
        return{
            mediaType: ''
        }
    },
    props:{
        url: String,
        type: String
    },
    created(){
        if(this.url.toLowerCase().endsWith('mp3')){
            this.mediaType = 'audio/mpeg'
        }
        else if(this.url.toLowerCase().endsWith('ogg')){
            this.mediaType = 'audio/ogg'
        }
        else if(this.url.toLowerCase().endsWith('wav')){
            this.mediaType = 'audio/wav'
        }
        else if(this.url.toLowerCase().endsWith('mp4')){
            this.mediaType = 'audio/mp4'
        }
        else if(this.url.toLowerCase().endsWith('webm')){
            this.mediaType = 'audio/webm'
        }
    }
}
</script>

<style scoped>
.player{
    width: 100%;
    height: 100%;
}
audio, video{
    width: 100%;
}

</style>