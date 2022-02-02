const {model, Schema } = require('mongoose')


const roleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }

})

module.exports = model('Role', roleSchema)