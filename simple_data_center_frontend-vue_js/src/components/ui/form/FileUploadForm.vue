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
</form>
</template>

<script>
import { mapState } from "vuex"
export default {
    computed:{
      ...mapState(["colors"])
    },
    methods:{
      async uploadFile(){
        var form = this.$refs.uploadForm
        var formData = new FormData(form)
        // console.log(formData)
        const res = await fetch('/upload', {
          method: 'POST',
          body: formData
        })
        const results = await res.json()
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