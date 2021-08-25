const express = require('express')
const router = express.Router()
const handle = require('../handleRequest');

router.get('/', (req, res) => {
    res.redirect('/tables')
})

router.get('/tables', (req, res) => {
    handle.getDBTables(req, res)
})

router.get('/tables/:tablename', (req, res) => {
    handle.getTableData(req, res)
})

router.get('/tables/:tablename/:id', (req, res) => {
    handle.handleIndividualRequest(req, res);
})

router.get('/form', (req, res) => {
    handle.handleForm(req, res);
})

router.get('/form/:tablename', (req, res) => {
    handle.handleTableForm(req, res);
})

router.post('/tables/test', (req, res) => {
    console.log(req.body)
    handle.handleTableFormPost(req, res);
})

router.delete('/tables/test', (req, res) => {
    handle.handleRecordDelete(req, res);
})


router.post('/form/:tablename/somepage', (req, res) => {
    handle.postToTable(req, res)
})


router.get('/about', (req, res) => {
    handle.handleAbout(req, res);
})

module.exports = router