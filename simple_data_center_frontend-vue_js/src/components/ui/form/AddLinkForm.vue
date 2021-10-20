<template>
  <div class="input-group mb-3">
  <input type="url" class="form-control" v-model="linkUrl" @keyup.enter="addLink" :style="{background: colors.bright, color: colors.text}">
  <button class="btn btn-outline-secondary" @click="addLink" :style="{background: colors.secondary, color: colors.text}">Add Link</button>
</div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data(){
    return{
      linkUrl: ""
    }
  },
  computed:{
    ...mapState(["colors"])
  },
  methods:{
    async addLink(){
      if(this.linkUrl != ""){
        var newLink = {
          title: this.linkUrl,
          url: this.linkUrl
        }
        const res = await fetch('/link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newLink)
        })
        const results = await res.json()
        this.linkUrl = ""
        this.$emit('newLink', results)
      }
    }
  }
}
</script>

<style>

</style>