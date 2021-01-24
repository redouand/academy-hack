//------MODULES
const express = require('express')
const per_unit_route = new express.Router();


per_unit_route.get('/courses/:id', (req, res)=>{
    const unit_name = req.params.id
    res.render('per-unit', { data: unit_name })
})

module.exports = per_unit_route