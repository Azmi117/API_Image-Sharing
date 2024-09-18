const userServices = require('../services/userServices');

const getAllUser = async (req, res, next) => {
    try{
        const {limit, page} = req.query;

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const params = {
            limit: parseInt(limit) || 10,
            offset: (parseInt(page) - 1) * (parseInt(limit) || 10) || 0,
            baseUrl
        };

        const users = await userServices.getAllUser(params);
        res.status(200).json(users);
    }catch(error){
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try{
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const params = {
            id:req.params.id,
            baseUrl
        }

        const user = await userServices.getUserById(params);
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

const getMe = async (req, res, next) => {
    try{
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const params = {
            id:req.user.id,
            baseUrl
        }

        const user = await userServices.getMe(params);
        res.status(200).json(user);

    }catch(error){
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try{
        let photo = req.file ? req.file.path : null;

        if(photo){
            photo = photo.replace(/\\/g, '/');
        }

        const user = await userServices.updateUser({
            id:req.params.id,
            photo:photo,
            ...req.body
        });

        user.photo = `${req.protocol}://${req.get('host')}/${user.photo}`;
        res.status(201).json(user);

    }catch(error){
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try{
        await userServices.deleteuser(req.params.id);
        res.status(204).send();
    }catch(error){
        next(error);
    }
}

module.exports = {
    getAllUser,
    getUserById,
    getMe,
    updateUser,
    deleteUser
}