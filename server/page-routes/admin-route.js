//------MODULES
const express = require('express')
const admin_route = new express.Router();

admin_route.get('/admin', (req, res)=>{
    res.render('admin')
})

module.exports = admin_route