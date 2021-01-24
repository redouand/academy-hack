//------MODULES
const express = require('express')
const retrieve_json_route = new express.Router();
const getId = require('../utils/get-id')



//-----RETRIEVES JSON FROM FRONT-END AND WRITES IT IN THE FILE SYSTEM
retrieve_json_route.post('/retrieve-json', async(req, res) =>{
    const docTitle = req.body.documentTitle;
    const arr = JSON.parse(req.body.jsonTXT)

    try {
        await getId(arr, docTitle)
        res.send('success')
    }
    
    catch (err) {
        res.send(err.message)
    }
})

module.exports = retrieve_json_route
