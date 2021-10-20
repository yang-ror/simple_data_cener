<template>
<div>
  <div class="title-bar">
    <img alt="Logo" src="../../assets/logo.png">
    <h1>Simple Data Center</h1>
  </div>
  <br>
  <ProgressBar :percentage="diskPercentage" :label="diskLabel" />
  <div class="button-div">
    <Button text="Files" />
    <Button text="Media" />
    <Button text="Links" />
    <Button text="Notes" />
    <ThemeBtn class="float-end" />
    <SearchBar class="float-end" />
  </div>
</div>
</template>

<script>
import { mapState } from "vuex"
import Button from "../ui/Button.vue"
import ThemeBtn from "../ui/ThemeBtn.vue"
import ProgressBar from "../ui/ProgressBar.vue"
import SearchBar from "../ui/SearchBar.vue"

export default {
  data(){
    return{
      diskPercentage: 0,
      diskLabel: ""
    }
  },
  components:{
    Button,
    ThemeBtn,
    ProgressBar,
    SearchBar
  },
  computed:{
    ...mapState(["colors"])
  },
  async created(){
    const res = await fetch('/diskspace')
    const results = await res.json()
    var diskCapacity = results.size / (1024*1024*1024)
    var freeSpace = results.free / (1024*1024*1024)
    this.diskPercentage = 100 - parseInt(freeSpace / diskCapacity * 100)
    this.diskLabel = `${parseInt(freeSpace)} GB free of ${parseInt(diskCapacity)} GB`
  }
}
</script>

<style scoped>
.button-div{
  margin-top: 10px;
}
img {
  width: 50px;
  height: 50px;
  float: left;
}

h1 {
  position: relative;
  left: 10px;
}
</style>