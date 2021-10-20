<template>
    <div ref="thisPanel" :style="(currentPage!=1&&currentPage==numberOfPages)? `height:${panelHeight}px` : ''">
      <div class="row">
        <div class="col">
          <Note @newNote="newNote" :id="0" />
        </div>
        <div v-for="(note, index) in notesInCurrentPage" :key="note._id" class="col">
          <Note @editNote="editNote" @deleteThisNote="deleteNote" v-if="!note.hide" :index="index+(currentPage-1)*itemPerPage" :id="note._id" :content="note.content" />
        </div>
      </div>
      <PageIndicator v-if="numberOfPages!=1" @pervious-page="goToPerviousPage" @next-page="goToNextPage" :numOfPages="numberOfPages" :currentPage="currentPage" />
    </div>
</template>

<script>
import { mapState } from "vuex"
import PageIndicator from "../../ui/PageIndicator.vue"
import Note from "../../ui/items/Note.vue"
export default {
  data(){
    return{
      notes: [],
      notesToDisplay: [],
      notesInCurrentPage: [],
      itemPerPage: 15,
      currentPage: 1,
      numberOfPages: 1,
      panelHeight: 0
    }
  },
  computed:{
      ...mapState(["itemFilter", "colors"])
  },
  components:{
    Note,
    PageIndicator
  },
  methods:{
    setPage(){
      if(this.notesToDisplay.length < this.itemPerPage){
        this.numberOfPages = 1
        this.notesInCurrentPage = this.notesToDisplay
      }
      else{
        this.numberOfPages = parseInt(this.notesToDisplay.length / this.itemPerPage) + 1
        this.notesInCurrentPage = this.notesToDisplay.slice((this.currentPage-1)*this.itemPerPage, 
          this.currentPage < this.numberOfPages ? 
            (this.currentPage)*this.itemPerPage : this.notesToDisplay.length-1
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
    newNote(newNote){
      this.notes.unshift(newNote)
      this.setPage()
      this.$forceUpdate()
    },
    editNote(newNote){
      for(let i = 0; i < this.notes.length; i++){
        if(this.notes[i]._id == newNote._id){
          this.notes[i] = newNote
          break
        }
      }
      this.$forceUpdate()
    },
    deleteNote(id){
      for(let i = 0; i < this.notes.length; i++){
        if(this.notes[i]._id == id){
          this.notes.splice(i, 1)
          break
        }
      }
      this.$forceUpdate()
    }
  },
  watch:{
    itemFilter(){
      this.notesToDisplay = this.itemFilter == "" ? this.notes : this.notes.filter(
        note => note.content.toLowerCase().includes(this.itemFilter.toLowerCase())
      )
      this.currentPage = 1
      this.setPage()
      this.$forceUpdate()
    }
  },
  async created(){
    const res = await fetch('/note')
    const results = await res.json() 
    this.notes = results
    this.notes.reverse()
    this.notesToDisplay = this.notes
    this.setPage()
  },
  mounted(){
    this.panelHeight = this.$refs.thisPanel.clientHeight
  }
}
</script>

<style scoped>
.col{
  min-width: 324px;
  max-width: 324px;
}
</style>