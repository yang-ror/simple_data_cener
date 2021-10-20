import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const NoteSchema = new Schema({
    content: {
        type: String, 
        required: "Must have a content"
    },
    hide: {
        type: Boolean,
        default: false
    }
})