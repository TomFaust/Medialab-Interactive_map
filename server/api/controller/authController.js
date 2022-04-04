import User from '../../models/User.js'
import jwt from 'jsonwebtoken'
import {registerValidation, loginValidation} from '../validation/userValidation.js'
import bcrypt from 'bcryptjs';
import { env } from '../../config/globals.js';

const postRegister = async function(req, res){
   
    //validation data
    const {error} = registerValidation(req.body)
    if(error) res.status(400).send(error.details[0].message);

    //check if user already exist 
    const userExist = await User.findOne({email: req.body.email});
    if(userExist) return res.status(400).send("Email already exist");

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name:  req.body.name,
        email:  req.body.email,
        password:  hashPassword,
    });

    try{
        await user.save()
        res.send({user: user._id});

    } catch(err) {
        res.status(400).send(err)
    }
};

const postLogin = async function(req, res){
     //validation data
     const {error} = loginValidation(req.body)
     if(error) res.status(400).send(error.details[0].message);

    //check if user already exist 
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email is not found");

    //check if user already exist 
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid password");

    //Create and assign a token
    const token = jwt.sign({_id: user._id, role: user.role}, env.LOGIN_TOKEN)
    await res.header('auth-token', token).send(token)
};


export default {
    postRegister,
    postLogin,
}
