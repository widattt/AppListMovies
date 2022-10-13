import { UserModel } from "../models/userModel"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



export const register = async (req, res, next) => {

    try {
        const checkUser = await UserModel.findOne({ email: req.body.email })
        if(checkUser) {
            
            return res.status(400).json({
                status: 'failure',
                message: 'Email is exists'
            })
            
        }
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        const token = jwt.sign({userId: user._id}, 'nguyenvandat')
        
        await user.save()
        res.status(200).json({
            status: 'success', 
            data: { token, username: user.name }
        })
    } catch (error) {
        console.log(error)
    }
}


export const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        let user 
        user = await UserModel.findOne({ email })
        if(!user) {
            user = await UserModel.findOne({name: email})
        }

        const check = user ? true : false 
        if(!check) {
            return res.status(400).json({
                status: 'failure',
                message: 'Email is not exists'
            })  
        }
        
        if(bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({userId: user._id}, 'nguyenvandat')
            res.setHeader('Access-Control-Allow-Headers', '*');
            res.status(200).json({
                status: 'success',
                data: { token, username: user.name }
            })
        }
        else {
            return res.status(400).json({
                status: 'failure',
                message: 'Password is not correct'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getCurrentUser = async (req, res, next ) => {
    try {
        const data = { user: null}
        if(req.user) {
            const user = await UserModel.findOne({_id: req.user})
            data.user = {name: user.name, id: user._id}
        }

        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (error) {
        res.json(error)        
    }
}