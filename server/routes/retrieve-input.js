//------MODULES
const express = require('express')
const retrieve_input_route = new express.Router();
const { htmlSender } = require('../utils/Set-HTML-browser');
const fs = require('fs')





//----RETRIEVES INPUT DATA FROM FRONT-END AND FEEDS IT TO HTML-SENDER
retrieve_input_route.post('/retrieve-input', async (req, res)=>{
    try {
        const { yearTxt, unitTxt } = JSON.parse(req.body.jsonInputs)
        console.log(yearTxt)
        await htmlSender(yearTxt, unitTxt)
        console.log('html sender has been executed!!')
        // --deletes file.
        fs.unlink(`${__dirname}/../../client/Temp-HTML.html`, (err)=>{
            if(err) throw err
            console.log('file Deleted');
        })
        res.send('done')  
    }
    catch (err) {
        res.send(err.message)
    }
})


module.exports = retrieve_input_route