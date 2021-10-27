<template>
  <div ref="thisPanel" :style="(currentPage!=1&&currentPage==numberOfPages)? `height:${panelHeight}px` : ''">
    <div class="row">
      <!-- <div class="col">
        <Media type="upload" />
      </div> -->
      <div v-for="media in mediasInCurrentPage" :key="media.fileIndex" class="col">
        <Media v-if="!media.hide" :index="media.fileIndex" @deleteThisFile="deleteFile" :name="media.name" :type="media.type" :url="media.path" />
      </div>
    </div>
    <PageIndicator v-if="numberOfPages!=1" @pervious-page="goToPerviousPage" @next-page="goToNextPage" :numOfPages="numberOfPages" :currentPage="currentPage" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import Media from "../../ui/items/Media.vue"
import PageIndicator from "../../ui/PageIndicator.vue"
export default {
  data(){
    return{
      medias: [],
      mediasToDisplay: [],
      mediasInCurrentPage: [],
      itemPerPage: 24,
      currentPage: 1,
      numberOfPages: 1,
      panelHeight: 0
    }
  },
  components:{
    Media,
    PageIndicator
  },
  computed:{
    ...mapState(["fileListUpdate", "fileList", "itemFilter"])
  },
  methods:{
    ...mapMutations(["deleteFileFromMedia"]),
    setPage(){
      if(this.mediasToDisplay.length <= this.itemPerPage){
        this.numberOfPages = 1
        this.mediasInCurrentPage = this.mediasToDisplay
      }
      else{
        this.numberOfPages = parseInt(this.mediasToDisplay.length / this.itemPerPage) + 1
        this.mediasInCurrentPage = this.mediasToDisplay.slice((this.currentPage-1)*this.itemPerPage, 
          this.currentPage < this.numberOfPages ? (this.currentPage)*this.itemPerPage : this.mediasToDisplay.length
        )
      }
    },
    goToPerviousPage(){
      if(this.currentPage > 1){
        this.currentPage--
        this.setPage()
        this.$forceUpdate()
      }
    },
    goToNextPage(){
      if(this.currentPage < this.numberOfPages){
        this.panelHeight = this.$refs.thisPanel.clientHeight
        this.currentPage++
        this.setPage()
        this.$forceUpdate()
      }
    },
    deleteFile(filename){
      for(let i = 0; i < this.medias.length; i++){
        if(this.medias[i].name == filename){
          this.medias.splice(i, 1)
          break
        }
      }
      this.deleteFileFromMedia(filename)
      this.setPage()
      this.$forceUpdate()
    },
    readFileList(){
      this.medias = []
      var i = 0
      for(let file of this.fileList){
        if(this.isImage(file.name)){
          let newMedia = {
            name: file.name,
            path: file.path,
            type: 'image',
            fileIndex: i
          }
          this.medias.push(newMedia)
        }
        else if(this.isAudio(file.name)){
          let newMedia = {
            name: file.name,
            path: file.path,
            type: 'audio',
            fileIndex: i
          }
          this.medias.push(newMedia)
        }
        else if(this.isVideo(file.name)){
          let newMedia = {
            name: file.name,
            path: file.path,
            type: 'video',
            fileIndex: i
          }
          this.medias.push(newMedia)
        }
        i++
      }
    },
    isImage(filename){
      var imgFormats = [".png", ".jpg", ".jpeg", ".gif", ".apng", ".svg", ".bmp"]
      for(let imgFormat of imgFormats){
        if(filename.toLowerCase().endsWith(imgFormat)){
          return true
        }
      }
      return false
    },
    isAudio(filename){
      var audFormats = [".mp3", ".wav", ".ogg"]
      for(let audFormat of audFormats){
        if(filename.toLowerCase().endsWith(audFormat)){
          return true
        }
      }
      return false
    },
    isVideo(filename){
      var vidFormats = [".mp4", ".webm"]
      for(let vidFormat of vidFormats){
        if(filename.toLowerCase().endsWith(vidFormat)){
          return true
        }
      }
      return false
    }
  },
  watch:{
    itemFilter(){
      this.mediasToDisplay = this.itemFilter == "" ? this.medias : this.medias.filter(
        media => media.name.toLowerCase().includes(this.itemFilter.toLowerCase())
      )
      this.currentPage = 1
      this.setPage()
      this.$forceUpdate()
    },
    fileListUpdate(){
      this.readFileList()
      this.mediasToDisplay = this.medias

      this.mediasInCurrentPage = []
      this.$forceUpdate()

      setTimeout(()=>{
        this.setPage()
        this.$forceUpdate()
      },0)
    }
  }
}
</script>

<style scoped>
.col{
  min-width: 330px;
  max-width: 330px;
  /* width: 330px; */
  height: 220px;
  margin-bottom: 15px;
}
</style>