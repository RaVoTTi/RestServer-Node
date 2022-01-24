const { response, request } = require("express");




const dashGet = (req = request, res = response) => {
    res.render('dashboard')
}


module.exports = {
    dashGet
}