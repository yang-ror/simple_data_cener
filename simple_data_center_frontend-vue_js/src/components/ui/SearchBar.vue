<template>
  <div class="search-bar rounded-pill" :style="{background: colors.secondary}" :class="filterEnabled? 'bg-danger bg-gradient' : ''">
      <div class="search-input-holder">
        <input class="search-input" :style="{color: colors.text}" v-model="searchByKeyWord">
      </div>
      <div class="search-icon-holder" :style="{color: colors.primary}">
          <SearchIcon class="search-icon" />
      </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import { BIconSearch as SearchIcon} from 'bootstrap-icons-vue';
export default {
    data(){
        return{
            searchByKeyWord: "",
            filterEnabled: false
        }
    },
    components:{
        SearchIcon
    },
    computed:{
        ...mapState(["colors"])
    },
    methods:{
        ...mapMutations(["applyFilter"]),
    },
    watch:{
        searchByKeyWord(keyword){
            this.applyFilter(keyword)
            this.filterEnabled = keyword != ""
        }
    }
}
</script>

<style scoped>
.search-bar{
    height: 38px;
    border-radius: 19px 0 0 19px;
}
.search-bar:hover{
    filter: brightness(1.2);
}
.search-input-holder, .search-icon-holder{
    height: 100%;
    display: inline-block;
}
.search-input{
    height: 100%;
    border: none;
    margin-left: 18px;
    background-color: transparent;
    outline: none;
    width: 120px;
}
.search-icon{
    margin-right: 10px;
    margin-left: 5px;
}
</style>