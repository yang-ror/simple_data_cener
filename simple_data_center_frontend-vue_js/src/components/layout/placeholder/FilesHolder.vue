<template>
  <div ref="thisPanel" :style="(currentPage!=1&&currentPage==numberOfPages)? `height:${panelHeight}px` : ''">
    <FileUploadForm @newFile="newFile" />
    <ul class="list-group">
      <template v-for="(file, index) in filesInCurrentPage" >
        <File :key="file.index" v-if="!file.hide" :index="index+(currentPage-1)*itemPerPage" @renameFile="renameFile" @deleteThisFile="deleteFile" :name="file.name" :url="file.path" />
      </template>
    </ul>
    <PageIndicator v-if="numberOfPages>1" @pervious-page="goToPerviousPage" @next-page="goToNextPage" :numOfPages="numberOfPages" :currentPage="currentPage" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import FileUploadForm from "../../ui/form/FileUploadForm.vue"
import PageIndicator from "../../ui/PageIndicator.vue"
import File from "../../ui/items/File.vue"
export default {
  data(){
    return{
      files: [],
      filesToDisplay: [],
      filesInCurrentPage: [],
      filterEnabled: false,
      itemPerPage: 20,
      currentPage: 1,
      numberOfPages: 1,
      panelHeight: 0
    }
  },
  components:{
    File,
    FileUploadForm,
    PageIndicator
  },
  computed:{
    ...mapState(["mediaListUpdate", "deletedMedia", "itemFilter"])
  },
  methods: {
    ...mapMutations(["setFileList"]),
    setPage(){
      if(this.filesToDisplay.length < this.itemPerPage){
        this.numberOfPages = 1
        this.filesInCurrentPage = this.filesToDisplay
      }
      else{
        this.numberOfPages = parseInt(this.filesToDisplay.length / this.itemPerPage) + 1
        this.filesInCurrentPage = this.filesToDisplay.slice((this.currentPage-1)*this.itemPerPage, 
          this.currentPage < this.numberOfPages ? 
            (this.currentPage)*this.itemPerPage : this.filesToDisplay.length-1
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
        this.currentPage++
        this.setPage()
        this.$forceUpdate()
      }
    },
    newFile(newFile){
      this.files.unshift(newFile)
      this.setFileList(this.files)
      this.setPage()
      this.$forceUpdate()
    },
    renameFile(newFile){
      for(let i = 0; i < this.files.length; i++){
        if(this.files[i].name == newFile.oldName){
          this.files[i] = newFile
          break
        }
      }
      this.setFileList(this.files)
      // this.$forceUpdate()
    },
    deleteFile(filename){
      for(let i = 0; i < this.files.length; i++){
        if(this.files[i].name == filename){
          this.files.splice(i, 1)
          break
        }
      }
      this.setFileList(this.files)
      this.setPage()
      this.$forceUpdate()
    }
  },
  watch:{
    itemFilter(){
      this.filesToDisplay = this.itemFilter == "" ? this.files : this.files.filter(
        file => file.name.toLowerCase().includes(this.itemFilter.toLowerCase())
      )
      this.currentPage = 1
      this.setPage()
      this.$forceUpdate()
    },
    mediaListUpdate(){
      this.deleteFile(this.deletedMedia)
    }
  },
  async created(){
    const res = await fetch('/file')
    const results = await res.json()    
    this.files = results
    this.files.reverse()
    this.setFileList(this.files)
    this.filesToDisplay = this.files
    this.setPage()
  },
  mounted(){
    this.panelHeight = this.$refs.thisPanel.clientHeight
  }
}
</script>

<style scoped>

</style>