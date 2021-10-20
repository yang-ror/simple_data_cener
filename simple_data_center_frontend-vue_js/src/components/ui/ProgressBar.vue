<template>
  <div class="progress" :style="{background: colors.disabled}">
    <div 
        class="progress-bar" 
        :style="{background: colors.secondary, color: colors.text, width: percentage + '%'}" 
        role="progressbar"
    >
    </div>
    <div id="progress-label">{{label}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
    props:{
        percentage: String,
        label: String
    },
    computed:{
        ...mapState(["colors"]),
    }
}
</script>

<style scoped>
/* .progress{
  display: flex;
  justify-content: center;
  align-items: center;
} */
/* .progress-bar{
  float: left;
} */
#progress-label{
    position: absolute;
    left:50%;
    transform: translate( -50%);
}
</style>