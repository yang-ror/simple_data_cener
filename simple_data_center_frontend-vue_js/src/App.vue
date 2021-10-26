<template>
<div class="container-xxl" :style="{color: colors.text}">
  <Header />
  <div v-for="panel in panels" :key="panel" >
    <DataPanel class="panel" :title="panel" />
  </div>
</div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
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
  methods:{
    ...mapMutations(["setDarkMode", "setLightMode"]),
  },
  created() {
    window.matchMedia('(prefers-color-scheme: dark)').matches ? this.setDarkMode() : this.setLightMode()
    document.querySelector('body').setAttribute('style', `background:${this.colors.background}`)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 371px;
}
.panel{
  margin-top: 60px;
}
</style>