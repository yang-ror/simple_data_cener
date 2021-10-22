<template>
  <div ref="thisPanel" :style="(currentPage!=1&&currentPage==numberOfPages)? `height:${panelHeight}px` : ''">
    <AddLinkForm @newLink="newLink" />
    <ul class="list-group">
      <li class="list-group-item" v-for="(link, index) in linksInCurrentPage" :key="link._id" :style="{background: colors.bright, color: colors.text}">
        <Link  v-if="!link.hide" :index="index+(currentPage-1)*itemPerPage" @editLink="editLink" @deleteThisLink="deleteLink" :id="link._id" :title="link.title" :url="link.url" />
      </li>
    </ul>
    <PageIndicator v-if="numberOfPages!=1" @pervious-page="goToPerviousPage" @next-page="goToNextPage" :numOfPages="numberOfPages" :currentPage="currentPage" />
  </div>
</template>

<script>
import { mapState } from "vuex"
import AddLinkForm from "../../ui/form/AddLinkForm.vue"
import PageIndicator from "../../ui/PageIndicator.vue"
import Link from "../../ui/items/Link.vue"
export default {
  data(){
    return{
      links: [],
      linksToDisplay: [],
      linksInCurrentPage: [],
      itemPerPage: 20,
      currentPage: 1,
      numberOfPages: 1,
      panelHeight: 0
    }
  },
  components:{
    Link,
    AddLinkForm,
    PageIndicator
  },
  computed:{
    ...mapState(["itemFilter", "colors"])
  },
  methods:{
    setPage(){
      if(this.linksToDisplay.length < this.itemPerPage){
        this.numberOfPages = 1
        this.linksInCurrentPage = this.linksToDisplay
      }
      else{
        this.numberOfPages = parseInt(this.linksToDisplay.length / this.itemPerPage) + 1
        this.linksInCurrentPage = this.linksToDisplay.slice((this.currentPage-1)*this.itemPerPage, 
          this.currentPage < this.numberOfPages ? 
            (this.currentPage)*this.itemPerPage : this.linksToDisplay.length-1
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
    newLink(newlLink){
      this.links.unshift(newlLink)
      this.setPage()
      this.$forceUpdate()
    },
    deleteLink(id){
      // this.links.filter(link => link.id != id)
      for(let i = 0; i < this.links.length; i++){
        if(this.links[i]._id == id){
          this.links.splice(i, 1)
          break
        }
      }
      this.setPage()
      this.$forceUpdate()
    },
    editLink(newLink){
      for(let i = 0; i < this.links.length; i++){
        if(this.links[i]._id == newLink._id){
          this.links[i] = newLink
          break
        }
      }
    }
  },
  watch:{
    itemFilter(){
      this.linksToDisplay = this.itemFilter == "" ? this.links : this.links.filter(
        link => link.url.toLowerCase().includes(this.itemFilter.toLowerCase())
      )
      this.currentPage = 1
      this.setPage()
      this.$forceUpdate()
    }
  },
  async created(){
    const res = await fetch('/link')
    const results = await res.json()
    this.links = results
    this.links.reverse()
    this.linksToDisplay = this.links
    this.setPage()
  },
  mounted(){
    this.panelHeight = this.$refs.thisPanel.clientHeight
  }
}
</script>

<style>

</style>