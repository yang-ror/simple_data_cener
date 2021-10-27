<template>
  <div class="progress" :style="{background: colors.disabled}">
    <div v-if="percentage<100"
        class="progress-bar" 
        :style="{background: colors.secondary, color: colors.text, width: percentage + '%'}" 
        role="progressbar"
    >
    </div>
    <div v-if="percentage==100" class="progress-bar progress-bar-striped bg-success progress-bar-animated" style="width: 100%"></div>
    <div id="progress-label">{{label}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
    props:{
        percentage: Number,
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