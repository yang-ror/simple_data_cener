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
import { VueCookieNext } from 'vue-cookie-next'
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
    ...mapMutations(["setLightMode", "setPanelOrder"]),
  },
  created(){
    // window.matchMedia('(prefers-color-scheme: dark)').matches ? this.setDarkMode() : this.setLightMode()
    VueCookieNext.config({ expire: '365d' })
    if(this.$cookie.getCookie('theme') == 'light'){
      this.setLightMode()
    }
    if(this.$cookie.getCookie('panel') != ''){
      let panelArray = this.$cookie.getCookie('panel').split('-')
      if(panelArray.includes('Todo') && panelArray.includes('Files') && panelArray.includes('Media') 
      && panelArray.includes('Links') && panelArray.includes('Notes')) this.setPanelOrder(panelArray)
    }
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
  margin-bottom: 30px;
}
.panel{
  margin-top: 60px;
}
</style>