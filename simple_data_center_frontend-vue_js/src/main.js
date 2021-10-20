import { createApp } from 'vue'
import { createStore } from "vuex"
import { 
    BIconGearFill,
    BIconMoonStarsFill, 
    BIconSunFill, 
    BIconFolderFill,
    BIconImage,
    BIconImages, 
    BIconLink45deg, 
    BIconStickiesFill, 
    BIconClipboardPlus,
    BIconPencilSquare,
    BIconBoxArrowInUpRight,
    BIconPencil,
    BIconCheckCircle,
    BIconDashCircle,
    BIconArrowUpSquare,
    BIconSearch,
    BIconCaretLeftFill,
    BIconCaretRightFill,
    BIconTrash,
    BIconXCircle
} from 'bootstrap-icons-vue'
import 'bootstrap'
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'

const store = createStore({
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
            panels: ['Files', 'Media', 'Links', 'Notes'],
            itemFilter: "",
            showCleanBtn:{
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
    mutations: {
        switchTheme(state){
            if(state.darkMode){
                state.colors = {
                    text: "#000000",
                    secondaryText: "#ffffff",
                    primary: "#35495e",
                    secondary: "#42b883",
                    background: "#ffffff",
                    bright: "#f8f8f8",
                    disabled: "#ececec"
                }
                document.querySelector('body').setAttribute('style', `background:${state.colors.background}`)
            }
            else{
                state.colors = {
                    text: "#ffffff",
                    secondaryText: "#000000",
                    primary: "#42b883",
                    secondary: "#35495e",
                    background: "#151515",
                    bright: "#333333",
                    disabled: "#777777"
                }
            }
            document.querySelector('body').setAttribute('style', `background:${state.colors.background}`)
            state.darkMode = !state.darkMode
        },
        goToPanel(state, payload){
            if(payload != state.panels[0]){
                let newArr = state.panels
                for(var i = 0; i < newArr.length; i++){
                    if(newArr[i] === payload){
                        newArr.splice(i, 1)
                    }
                }
                newArr.splice(0, 0, payload)
                state.panels = newArr
            }
        },
        toggleNoteBox(state){
            state.showNoteBox = !state.showNoteBox
        },
        // copyToClipBoard(state, payload){
        //     console.log("Copy to clipboard\n" + payload)
        // },
        applyFilter(state, payload){
            state.itemFilter = payload
        },
        toogleClean(state, payload){
            switch(payload){
                case 'Files':
                    state.showCleanBtn.files = !state.showCleanBtn.files
                    break
                case 'Media':
                    state.showCleanBtn.media = !state.showCleanBtn.media
                    break
                case 'Links':
                    state.showCleanBtn.links = !state.showCleanBtn.links
                    break
                case 'Notes':
                    state.showCleanBtn.notes = !state.showCleanBtn.notes
                    break
            }
        },
        setFileList(state, payload){
            state.fileList = payload
            state.fileListUpdate++
        },
        deleteFileFromMedia(state, payload){
            state.deletedMedia = payload
            state.mediaListUpdate++
        }
    }
})

const app = createApp(App)

app.use(store)

app.component('SettingIcon', BIconGearFill)
app.component('DarkModeIcon', BIconMoonStarsFill)
app.component('LightModeIcon', BIconSunFill)
app.component('FolderIcon', BIconFolderFill)
app.component('ShowInMediaIcon', BIconImage)
app.component('MediaIcon', BIconImages)
app.component('LinkIcon', BIconLink45deg)
app.component('NoteIcon', BIconStickiesFill)
app.component('CopyIcon', BIconClipboardPlus)
app.component('EditIcon', BIconPencilSquare)
app.component('ViewInBoxIcon', BIconBoxArrowInUpRight)
app.component('RenameIcon', BIconPencil)
app.component('SubmitIcon', BIconCheckCircle)
app.component('CancelIcon', BIconDashCircle)
app.component('UploadIcon', BIconArrowUpSquare)
app.component('SearchIcon', BIconSearch)
app.component('LeftPageIcon', BIconCaretLeftFill)
app.component('RightPageIcon', BIconCaretRightFill)
app.component('TrashIcon', BIconTrash)
app.component('DeleteIcon', BIconXCircle)

app.mount('#app')