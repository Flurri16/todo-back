import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    todo: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'} ]

})
export default mongoose.model('User', UserSchema)
