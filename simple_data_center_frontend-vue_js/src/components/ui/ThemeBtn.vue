<template>
  <button @click="switchTheme" class="btn rounded-circle" :style="{background: colors.secondary}">
    <LightModeIcon class="theme-icon" v-show="darkMode" :style="{color: colors.primary}" />
    <DarkModeIcon class="theme-icon" v-if="darkMode==false" :style="{color: colors.primary}" />
  </button>
</template>

<script>
import { mapState, mapMutations } from "vuex"
export default {
    name: 'ThemeBtn',
    methods: {
        ...mapMutations(["setLightMode", "setDarkMode"]),
        switchTheme(){
            this.darkMode ? this.setLightMode() : this.setDarkMode()
        }
    },
    computed:{
        ...mapState(["darkMode", "colors"])
    }
}
</script>

<style scoped>
button{
    margin-left: 10px;
    width: 38px;
}
.theme-icon{
    transform: translate(-2px, -1px);
}
button:hover{
    filter: brightness(1.2);
}
button:active{
    filter: brightness(0.75);
}
</style>