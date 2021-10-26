<template>
    <audio controls>
        <source :src="url" type="audio/ogg">
    </audio>
</template>

<script>
export default {
    data(){
        return{
            audioType: ''
        }
    },
    props:{
        url: String
    },
    created(){
        var audioFormat = this.url.slice(-3, this.url.length)
        if(audioFormat == 'mp3'){
            this.audioType = 'audio/mpeg'
        }
        else if(audioFormat == 'ogg'){
            this.audioType = 'audio/ogg'
        }
        else if(audioFormat == 'wav'){
            this.audioType = 'audio/wav'
        }
    }
}
</script>

<style>

</style>