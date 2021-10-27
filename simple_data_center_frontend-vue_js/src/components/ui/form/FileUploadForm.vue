<template>
<form ref="uploadForm" enctype="multipart/form-data">
  <div class="input-group mb-3">
    <input ref="fileSelect" type="file" class="form-control" name="foo"
        :style="{background: colors.bright, color: colors.text}"
    >
    <label @click="uploadFile" class="input-group-text"
         :style="{background: colors.secondary, color: colors.text}"
    >Upload</label>
  </div>
  <ProgressBar v-if="uploading" :percentage="100" label="Uploading ..." />
</form>
</template>

<script>
import { mapState } from "vuex"
import ProgressBar from "../ProgressBar.vue"
export default {
  data(){
    return{
      uploading: false
    }
  },
  components:{
    ProgressBar
  },
  computed:{
    ...mapState(["colors"])
  },
  methods:{
    async uploadFile(){
      this.uploading = true
      console.log(this.uploading)
      var form = this.$refs.uploadForm
      var formData = new FormData(form)
      // console.log(formData)
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData
      })
      const results = await res.json()
      this.uploading = false
      console.log(this.uploading)
      this.$refs.fileSelect.value = null
      this.$emit('newFile', results)
    }
  }
}
</script>

<style scoped>
.input-group-text{
  cursor: pointer;
}
</style>