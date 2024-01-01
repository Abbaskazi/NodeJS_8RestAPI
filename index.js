const express = require('express')
const mongoose = require('mongoose')
const app = express()
const NoteModel = require('./Model/NoteModel')

mongoose.connect('mongodb+srv://abbas:adnanabbas@nodeapplication.wywl28e.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log('Database is connected')).catch((error)=>console.log(error.message))

app.use(express.json())

app.post('/createNote',async (req,res)=>{
    console.log(req.body)
    try {
        const {title, content} = req.body
        const Note = await NoteModel.create({
            title,
            content
        })
        Note.save()
        res.json({status: 'ok'})
    } catch (error) {
        return res.json("Error Message: " + error.message);
    }
})


app.get('/showNote',async (req,res)=>{
    try {
        const Note = await NoteModel.find({})
        res.send(Note)
    } catch (error) {
        return res.json("Error Message: " + error.message);
    }
})

app.get('/showNote/:id', async (req,res)=>{
    try {
        const Note = await NoteModel.find({_id: req.params.id})
        res.json(Note)
    } catch (error) {
        return res.json("Error Message: " + error.message);
    }
})

app.put('/updateNote/:id', async (req,res)=>{
    try {
        const {title, content} = req.body
        const Note = await NoteModel.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                title,
                content, 
                time: Date.now()
            },
            {new: true}
        )
        res.json({status: 'Modified', note :  Note})
    } catch (error) {
        return res.json("Error Message: " + error.message);
    }
})

app.delete('/deleteNote/:id',async (req,res)=>{
    try {
        const NoteId = req.params.id
        const Note = await NoteModel.findByIdAndDelete(NoteId)
        res.json(Note)
    } catch (error) {
        return res.json("Error Message: " + error.message);
    }
})

app.listen(3000 , ()=>console.log('Server is running in port 3000'))