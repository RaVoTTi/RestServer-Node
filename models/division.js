const {model, Schema } = require('mongoose')


const divisionSchema = new Schema({
    name: {
        type: String,
        unique:true,
        required: [true, 'El division es obligatorio']
    },
    state:{
        type: Boolean,
        required: true,
        default: true
    }

})

divisionSchema.methods.toJSON = function (){
    const {__v, ...resto} = this.toObject()

    return resto
}

module.exports = model('Division', divisionSchema)