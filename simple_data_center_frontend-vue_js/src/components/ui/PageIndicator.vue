<template>
  <div class="text-center">
    <LeftPageIcon @click="$emit('pervious-page')" class="arrowIcon" :style="{color: colors.primary}" />
    <div v-for="n in numOfPages" :key="n" class="page-dots" 
        :style="{background: n===currentPage ? colors.primary : colors.disabled}">
    </div>
    <RightPageIcon @click="$emit('next-page')" class="arrowIcon" :style="{color: colors.primary}" />
  </div>
</template>

<script>
import { mapState } from "vuex"
import {
    BIconCaretLeftFill as LeftPageIcon,
    BIconCaretRightFill as RightPageIcon
} from 'bootstrap-icons-vue';

export default {
    props:{
        numOfPages: Number,
        currentPage: Number
    },
    components:{
        LeftPageIcon,
        RightPageIcon
    },
    computed:{
        ...mapState(["colors"])
    }
}
</script>

<style>
.arrowIcon{
    font-size: 2em;
}
.arrowIcon:hover{
    filter: brightness(75%);
}
.arrowIcon:active{
    filter: brightness(50%);
}
.page-dots{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    margin-left: 5px;
}
</style>