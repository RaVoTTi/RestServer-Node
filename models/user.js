const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El name es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    role: {
        type: String,
        required: [true, 'El role es obligatorio']
    },
    img: String,
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false    
    },
    
})

// userSchema.pre('save', function() {
//     const user = this
    
//     if(!user.isModified('password')) return next()
// })

module.exports = model('User', userSchema)