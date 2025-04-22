import jwt from 'jsonwebtoken'
import User from './models/User.js'
import bcrypt from 'bcryptjs'
export const register = async (req, res) => {
    try {
        const {username, password} = req.body

        const isUsed = await User.findOne({username})
        if(isUsed) return res.status(400).json({message: 'User already exist.'})

        const salt = await bcrypt.genSalt(8)
        const hash = await bcrypt.hash(password, salt)

        const newUser = new User({username, password: hash})

        const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
        await newUser.save()
        return res.json({newUser, message: "Registration was succefull.", token})

    } catch(err) {
        console.log(err)
        return res.json({message: 'Backend register error.'})
    }
}
export const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (!user) return res.status(400).json({ message: "User is not found." })
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "Password is incorrect." })
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
        return res.json({user, message: "You was loggined.", token})
    } catch(err) {
        console.log(err)
        return res.json({message: 'Backend login error.'})
    }
}