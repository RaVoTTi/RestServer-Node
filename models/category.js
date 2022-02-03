const {model, Schema } = require('mongoose')


const divisionSchema = new Schema({
    division: {
        type: String,
        required: [true, 'El division es obligatorio']
    }

})

module.exports = model('Division', roleSchema)