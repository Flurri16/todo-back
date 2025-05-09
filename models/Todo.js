import mongoose from 'mongoose'
const TodoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    complited: { type: Boolean, default: false },
    important: { type: Boolean, default: false }
}, {timestamps: true})
export default mongoose.model('Todo', TodoSchema)