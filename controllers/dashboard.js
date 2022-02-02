const { response, request } = require("express");




const dashGet = (req = request, res = response) => {
 
    res.render('dashboard')
}
const dashPost = (req = request, res = response) => {
    console.log(req.body)
    res.render('dashboard')
}


module.exports = {
    dashGet,
    dashPost
}