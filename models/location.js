const { Schema, model} = require('mongoose')


const locationSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'name is required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        },
    division: {
        type: String,
        required: [true, 'category is required'],
        
    },
    number: {
        type: String,
        required: [true, 'number is required'],


    },
    schedule: {
        type: String,
        },
    urlImage: String,
    urlLocation: String
})


module.exports = model('Location', locationSchema)