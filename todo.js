import Todo from "./models/Todo.js";
import User from "./models/User.js";
export const create = async (req, res) => {
    try {
        const {title} = req.body
        const user = await User.findById(req.userId)
        if(!user) return res.json({message: "Error back todo"})
        const newTodo = await new Todo({
            title: title
        })
        await newTodo.save()
        // user.todo.push(newTodo._id)
        await User.findByIdAndUpdate(req.userId, {
            $push: {
                todo: newTodo
            }
        })

        await user.save()

        return res.json({newTodo, message: "Task was added."})
    } catch(err) {
        console.log(err)
        return res.json({message: "Error to create todo."})
    }
}
export const getAll = async (req, res) => {
    try {
        const user = await User.findById(req.userId)            
        .populate({
            path: 'todo',
            options: { sort: { createdAt: -1 } } 
        })
        if (!user) return res.status(404).json({ message: "User not found." })

        return res.json({ todos: user.todo })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ message: "Server error while getting todos." })
    }
}
export const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params
        const deletedTodo = await Todo.findByIdAndDelete(id)
        if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
        await User.findByIdAndUpdate(req.userId, {
            $pull: {todo: id}
        })
        return res.json({ message: "Todo deleted.", deletedTodo });
    } catch(err) {
        console.log(err)
        return res.status(500).json({ message: "Error deleting todo" });
    }
}
export const completeTodo = async (req, res) => {
    try {
        const {id} = req.params
        const todo = await Todo.findById(id);
        const updated = await Todo.findByIdAndUpdate(id, {complited: !todo.complited})
        return res.json({updated})

    } catch(err) {
        console.log(err)
    }
}
export const importantTodo = async (req, res) => {
    try {
        const {id} = req.params
        const todo = await Todo.findById(id);
        const updated = await Todo.findByIdAndUpdate(id, {important: !todo.important})
        return res.json({updated})

    } catch(err) {
        console.log(err)
    }
}