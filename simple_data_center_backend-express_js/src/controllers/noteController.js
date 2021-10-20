import mongoose from 'mongoose'
import { NoteSchema } from '../models/noteModel'

const Note = mongoose.model('Note', NoteSchema)

export const addNewNote = (req, res) => {
    let newNote = new Note(req.body)

    newNote.save((err, note) => {
        if(err){
            res.send(err)
        }
        res.json(note)
    })
}

export const getNotes = (req, res) => {
    Note.find({}, (err, note) => {
        if(err){
            res.send(err)
        }
        res.json(note)
    })
}

export const getNoteById = (req, res) => {
    Note.findById(req.params.NoteId, (err, note) => {
        if(err){
            res.send(err)
        }
        res.json(note)
    })
}

export const updateNote = (req, res) => {
    Note.findOneAndUpdate({_id: req.params.noteId}, req.body, {new: true, useFindAndModify: false}, (err, note) => {
        if(err){
            res.send(err)
        }
        res.json(note)
    })
}

export const deleteNote = (req, res) => {
    Note.deleteOne({_id: req.params.noteId}, (err, note) => {
        if(err){
            res.send(err)
        }
        res.json(note)
    })
}