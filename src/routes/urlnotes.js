// urls de las notas de los usuarios
const { Router } = require('express');
const express = require('express');
const rutas = require('express').Router();

const NotasM = require('../models/notes-model');

const { isAuthenticated }= require('../helpers/salir');

rutas.get('/notas/nuevan', isAuthenticated, (req, res)=>{
    res.render('notas/nueva-nota.hbs')
});

rutas.post('/notas/nueva-nota', isAuthenticated, async (req,res)=>{
    const {titulo, descripcion}= req.body;
    const error = [];     

    if (!titulo) {
        error.push({text: 'Ingresa un titulo'});
    }
    if (!descripcion) {
        error.push({text: 'Ingresa una descripcion'});
    }

    if (error.length > 0) {
        res.render('notas/nueva-nota.hbs', {
            errors,
            titulo,
            descripcion
        });
    }else{
       const NewNote = new NotasM({titulo, descripcion});
       NewNote.user= req.user.id;
       await NewNote.save();
       req.flash('success_msg', 'Nota Agregada');
       //console.log(NewNote);
       res.redirect('/urlnotes');
    }

/*console.log(req.body);
res.send('OK');*/
});

rutas.get('/urlnotes', isAuthenticated, async (req,res) => {
   let notes=[];
    NotasM.find({user: req.user.id}, { __v: 0 }, (err, result) => {
        if (result) {
            notes = result.map((v)=>({...v._doc, fecha: new Date(v._doc.fecha).toLocaleString()})).reverse();
            console.log(notes)
          res.render('notas/ver-notas.hbs', {notes});
        } 
      });

    //const notes = await (await NotasM.find({user: req.user.id})).reverse();
   //console.log(notes.map((v)=>(v)))

});

rutas.get('/notas/editar/:id', isAuthenticated, async (req, res) =>{
    const notaed = await NotasM.findById(req.params.id)
    res.render('notas/editar-notas.hbs', {notaed});
});

rutas.put('/notas/editar-notas/:id', isAuthenticated, async (req, res)=>{
    const {titulo, descripcion} = req.body;
    await NotasM.findByIdAndUpdate(req.params.id, {titulo, descripcion});
    req.flash('edit_msg', 'Nota editada') //si pasa algo borrar
    res.redirect('/urlnotes');
})

rutas.delete('/notas/borrar/:id', isAuthenticated, async (req, res) =>{
    await NotasM.findByIdAndDelete(req.params.id);
    req.flash('delete_msg', 'Nota borrada')
    res.redirect('/urlnotes');
})

module.exports=rutas;

