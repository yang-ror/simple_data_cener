<template>
<div >
  <div calss="title-holder">
    <FolderIcon v-if="title==='Files'" class="file-icon title-elements" :style="{color: colors.primary}" />
    <MediaIcon v-if="title==='Media'" class="file-icon title-elements" :style="{color: colors.primary}" />
    <LinkIcon v-if="title==='Links'" class="file-icon title-elements" :style="{color: colors.primary}" />
    <NoteIcon v-if="title==='Notes'" class="file-icon title-elements" :style="{color: colors.primary}" />
    <h2 class="panel-title title-elements">{{ title }}</h2>
    <CleanBtn class="clean-btn title-elements" :type="title" />
  </div>
  <TodoHolder v-if="title==='Todo'" />
  <FilesHolder v-if="title==='Files'" />
  <MediaHolder v-if="title==='Media'" />
  <LinksHolder v-if="title==='Links'" />
  <NotesHolder v-if="title==='Notes'" />
</div>

</template>

<script>
import { mapState } from "vuex"
import CleanBtn from "../ui/CleanBtn.vue"
import TodoHolder from "./placeholder/TodoHolder.vue"
import FilesHolder from "./placeholder/FilesHolder.vue"
import MediaHolder from "./placeholder/MediaHolder.vue"
import LinksHolder from "./placeholder/LinksHolder.vue"
import NotesHolder from "./placeholder/NotesHolder.vue"

export default {
    props:{
        title: String
    },
    components:{
        CleanBtn,
        TodoHolder,
        FilesHolder,
        MediaHolder,
        LinksHolder,
        NotesHolder,
    },
    computed:{
        ...mapState(["showCleanBtn","colors"])
    }
}
</script>

<style scoped>
.file-icon{
  font-size: 2.3em;
  float: left;
}
.title-elements{
  display:inline-block
}
.panel-title{
  margin-left: 15px;
}
.clean-btn{
  position: relative;
  float: right;
}
</style>