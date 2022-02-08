const { Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    role: {
        type: String,
        required: [true, 'rol is required'],
        // enum: ['ADMIN_ROLE','USER_ROLE'],

    },
    image: String,
    state: {
        type:Boolean,
        default: true
    },
    google: {
        type:Boolean,
        default:false
    },
    
})

// se utiliza function por el this que referencia al password
userSchema.pre('save', function (next) {
    const user = this;

    if(!user.isModified('password')) return next()

    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(user.password, salt)

    next()


})
// userSchema.pre('findByIdAndUpdate', function (next) {
//     const user = this;

//     if(user.isModified('password')){
//     const salt = bcrypt.genSaltSync(10)
//     user.password = bcrypt.hashSync(user.password, salt)
// }
//     next()


// })
userSchema.statics.encryptPassword = (password = '')=>{
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
 }


userSchema.methods.comparePassword = function(password = ''){
   return bcrypt.compareSync(password, this.password)
}

userSchema.methods.toJSON = function (){
    const {__v, password, ...resto} = this.toObject()

    return resto
}


module.exports = model('User', userSchema)