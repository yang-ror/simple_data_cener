<template>
  <button @click="goToPanel(text)" class="btn" :style="{background: colors.primary, color: colors.secondaryText}">{{text}}</button>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
    name: 'Button',
    props: {
        text: String
    },
    methods: {
        ...mapMutations(["goToPanel"])
    },
    computed:{
        ...mapState(["colors"])

    }
}
</script>

<style scoped>
button{
    margin-right: 5px;
}
button:hover{
    filter: brightness(1.5);
}
button:active{
    filter: brightness(0.75);
}
</style>