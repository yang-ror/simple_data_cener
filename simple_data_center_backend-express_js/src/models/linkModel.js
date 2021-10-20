import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const LinkSchema = new Schema({
    title: {
        type: String
    },
    url: {
        type: String, 
        required: "Must enter an url"
    },
    hide: {
        type: Boolean,
        default: false
    }
})