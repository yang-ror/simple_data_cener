<template>
  <button @click="switchTheme" class="btn rounded-circle" :style="{background: colors.secondary}">
    <LightModeIcon class="theme-icon" v-show="darkMode" :style="{color: colors.primary}" />
    <DarkModeIcon class="theme-icon" v-if="darkMode==false" :style="{color: colors.primary}" />
  </button>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import { VueCookieNext } from 'vue-cookie-next'
import {
    BIconMoonStarsFill as DarkModeIcon,
    BIconSunFill as LightModeIcon
} from 'bootstrap-icons-vue';
export default {
    name: 'ThemeBtn',
    components:{
        DarkModeIcon,
        LightModeIcon
    },
    methods: {
        ...mapMutations(["setLightMode", "setDarkMode"]),
        switchTheme(){
            if(this.darkMode){
                this.setLightMode()
                VueCookieNext.setCookie('theme', 'light')
            }
            else{
                this.setDarkMode()
                VueCookieNext.setCookie('theme', 'dark')
            }
            
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