import mongoose from 'mongoose'
import { LinkSchema } from '../models/linkModel'

const Link = mongoose.model('Link', LinkSchema)

export const addNewLink = (req, res) => {
    let newLink = new Link(req.body)

    newLink.save((err, link) => {
        if(err){
            res.send(err)
        }
        res.json(link)
    })
}

export const getLinks = (req, res) => {
    Link.find({}, (err, link) => {
        if(err){
            res.send(err)
        }
        res.json(link)
    })
}

export const getLinkById = (req, res) => {
    Link.findById(req.params.LinkId, (err, link) => {
        if(err){
            res.send(err)
        }
        res.json(link)
    })
}

export const updateLink = (req, res) => {
    Link.findOneAndUpdate({_id: req.params.linkId}, req.body, {new: true, useFindAndModify: false}, (err, link) => {
        if(err){
            res.send(err)
        }
        res.json(link)
    })
}

export const deleteLink = (req, res) => {
    Link.deleteOne({_id: req.params.linkId}, (err, link) => {
        if(err){
            res.send(err)
        }
        res.json(link)
    })
}