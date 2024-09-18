const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (params) => {
    const{username, email, password, photo} = params;

    const exist = await User.findOne({
        where:{
            email
        }
    });

    if(exist) throw new Error('Email has been registered');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        photo
    });

    if(!newUser) throw new Error('Failed To Register');

    return newUser;
}

const login = async (params) => {
    const {email, password} = params;

    const exist = await User.findOne({
        where:{
            email
        }
    });

    if(!exist) throw new Error('Invalid Credenstials');

    const valid = await bcrypt.compare(password, exist.password);
    if(!valid) throw new Error('Invalid Credentials');

    const token = jwt.sign({
        id:exist.id
    }, process.env.JWT_SECRET, {expiresIn: '1h'});

    return {token};
}

module.exports = {
    register,
    login
}