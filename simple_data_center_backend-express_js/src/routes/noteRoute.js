import {getNotes, getNoteById, addNewNote, updateNote, deleteNote} from '../controllers/noteController'

const routes = (app) => {
    app.route('/note')
        .get(getNotes)
        .post(addNewNote)
    
    app.route('/note/:noteId')
        .get(getNoteById)
        .put(updateNote)
        .delete(deleteNote)
}

export default routes;