import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const TodoSchema = new Schema({
    title: {
        type: String,
        required: "Must enter an title"
    },
    completed: {
        type: Boolean,
        default: false
    },
    hide: {
        type: Boolean,
        default: false
    }
})