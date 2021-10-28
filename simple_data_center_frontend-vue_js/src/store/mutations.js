import { VueCookieNext } from 'vue-cookie-next'

export default {
    setDarkMode(state){
        state.colors = {
            text: "#ffffff",
            secondaryText: "#000000",
            primary: "#42b883",
            secondary: "#35495e",
            background: "#151515",
            bright: "#333333",
            disabled: "#777777"
        }
        document.querySelector('body').setAttribute('style', `background:${state.colors.background}`)
        state.darkMode = true
    },
    setLightMode(state){
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
        state.darkMode = false
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
            VueCookieNext.setCookie('panel', newArr.join('-'))
            
        }
    },
    setPanelOrder(state, payload){
        state.panels = payload
    },
    // toggleNoteBox(state){
    //     state.showNoteBox = !state.showNoteBox
    // },
    applyFilter(state, payload){
        state.itemFilter = payload
    },
    toogleClean(state, payload){
        switch(payload){
            case 'Todo':
                state.showCleanBtn.todo = !state.showCleanBtn.todo
                break
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