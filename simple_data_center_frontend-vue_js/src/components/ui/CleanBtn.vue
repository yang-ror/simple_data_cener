<template>
  <button @click="toogleActive" class="btn rounded-circle" :style="{background: colors.secondary}" 
    :class="isActive ? 'bg-danger bg-gradient' : ''">
    <TrashIcon class="trash-icon" :style="{color: colors.primary}" />
  </button>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import { BIconTrash as TrashIcon } from 'bootstrap-icons-vue';
export default {
    data(){
        return{
            isActive: false
        }
    },
    props:{
        type: String,
    },
    components:{
        TrashIcon
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
    width: 38px;
}
/* .btn{
    
} */
.trash-icon{
    transform: translate(-2px, -1px);
}
button:hover{
    filter: brightness(1.2);
}
button:active{
    filter: brightness(0.75);
}
</style>