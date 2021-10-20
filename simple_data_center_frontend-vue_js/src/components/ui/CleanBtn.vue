<template>
  <button @click="toogleActive" class="btn rounded-circle" :style="{background: colors.secondary}" 
    :class="isActive ? 'bg-danger bg-gradient' : ''">
    <TrashIcon class="trash-icon" :style="{color: colors.primary}" />
  </button>
</template>

<script>
import { mapState, mapMutations } from "vuex"
export default {
    data(){
        return{
            isActive: false
        }
    },
    props:{
        type: String,
    },
    methods:{
        ...mapMutations(["toogleClean"]),
        toogleActive(){
            this.isActive = !this.isActive
            this.toogleClean(this.type)
        }
    },
    computed:{
        ...mapState(["colors"])
    }
}
</script>

<style scoped>
button{
    margin-left: 10px;
}
.btn{
    width: 38px;
}
.trash-icon{
    transform: translate(-2px, -1px);
}
</style>