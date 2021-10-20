<template>
<div class="container-xxl" :style="{color: colors.text}">
  <Header />
  <div v-for="panel in panels" :key="panel" >
    <DataPanel class="panel" :title="panel" />
  </div>
</div>
</template>

<script>
import { mapState } from "vuex"
import Header from "./components/layout/Header.vue"
import DataPanel from "./components/layout/DataPanel.vue"
export default {
  name: 'App',
  components: {
    Header,
    DataPanel
  },
  computed:{
    ...mapState(["colors", "panels"])
  },
  created() {
    document.querySelector('body').setAttribute('style', `background:${this.colors.background}`)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 365px;
  margin-top: 60px;
  margin-bottom: 100px;
}
.panel{
  margin-top: 60px;
}
</style>