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
        type: Schema.Types.ObjectId,
        ref: 'Division',
        required: true
    },
    number: {
        type: String,
        required: [true, 'number is required'],
    },
    schedule: {
        type: String,
        },
    urlImage: String,
    urlLocation: String,
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
})

locationSchema.methods.toJSON = function (){
    const {__v, ...resto} = this.toObject()

    return resto
}


module.exports = model('Location', locationSchema)