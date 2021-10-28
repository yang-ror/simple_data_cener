import Vuex from "vuex"
import mutations from './mutations'

export default new Vuex.Store({
    state(){
        return{
            darkMode: true,
            colors:{
                text: "#ffffff",
                secondaryText: "#000000",
                primary: "#42b883",
                secondary: "#35495e",
                background: "#151515",
                bright: "#333333",
                disabled: "#777777"
            },
            panels: ['Todo', 'Files', 'Media', 'Links', 'Notes'],
            itemFilter: "",
            showCleanBtn:{
                todo: false,
                files: false,
                media: false,
                links: false,
                notes: false
            },
            fileListUpdate: 0,
            fileList: [],
            mediaListUpdate: 0,
            deletedMedia: ""
        }
    },
    mutations: mutations
})