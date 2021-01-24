//------MODULES
const express = require('express')
const retrieve_url_route = new express.Router();
const requester = require('../utils/Get-Direct')


//-----RETRIEVES the id, AND SEND BACK DIRECT-URL
retrieve_url_route.post('/get-direct-route', async (req, res)=>{
    try {
        const id = req.body.id
        const direct = await requester(id)
        res.send(direct)
        console.log(direct);
    }
    
    catch (err) {
        console.log(err);
    }
})

module.exports = retrieve_url_route