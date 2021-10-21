import mongoose from 'mongoose'
import { TodoSchema } from '../models/todoModel'

const Todo = mongoose.model('Todo', TodoSchema)

export const addNewTodo = (req, res) => {
    let newTodo = new Todo(req.body)

    newTodo.save((err, todo) => {
        if(err){
            res.send(err)
        }
        res.json(todo)
    })
}

export const getTodos = (req, res) => {
    Todo.find({}, (err, todo) => {
        if(err){
            res.send(err)
        }
        res.json(todo)
    })
}

export const getTodoById = (req, res) => {
    Todo.findById(req.params.TodoId, (err, todo) => {
        if(err){
            res.send(err)
        }
        res.json(todo)
    })
}

export const updateTodo = (req, res) => {
    Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true, useFindAndModify: false}, (err, todo) => {
        if(err){
            res.send(err)
        }
        res.json(todo)
    })
}

export const deleteTodo = (req, res) => {
    Todo.deleteOne({_id: req.params.todoId}, (err, todo) => {
        if(err){
            res.send(err)
        }
        res.json(todo)
    })
}