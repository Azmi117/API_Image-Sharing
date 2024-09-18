const { User } = require('../models');

const getAllUser = async (params) => {
    const {limit, offset, baseUrl} = params;

    const queryOptions = {
        limit: limit || 10,
        offset: offset || 0
    }

    const users = await User.findAndCountAll(queryOptions);
    if(!users) throw new Error('No User Exist');

    users.rows = users.rows.map((userData) => {
        if(userData.photo){
            userData.photo = `${baseUrl}/${userData.photo}`; 
        }
        return userData;
    });

    return{
        totalUsers: users.count,
        user: users.rows,
        totalPages: Math.ceil(users.count / (limit || 10)),
        pages: Math.floor((offset || 0) / (limit || 10)) + 1
    };
};

const getUserById = async (params) => {
    const {id, baseUrl} = params;

    const user = await User.findByPk(id);
    if(!user) throw new Error('User not found');

    if(user.photo){
        user.photo = `${baseUrl}/${user.photo}`;
    }

    return user;
}

const getMe = async (params) => {
    const {id, baseUrl} = params;

    const user = await User.findOne({
        where:{
            id
        }
    });
    if(!user) throw new Error('User Not Found');

    if(user.photo){
        user.photo = `${baseUrl}/${user.photo}`;
    }

    return user;
};

const updateUser = async (params) => {
    const {id, username, email, photo} = params;

    const update = await User.update(
        {username, email, photo},
        {
            where:{
                id
            }
        });

    if(!update) throw new Error('User Not Found');

    const user = await User.findByPk(id);

    return user;
}

const deleteuser = async (params) => {
    const id = params;

    const user = await User.destroy({
        where:{
            id
        }
    });

    if(!user) throw new Error('User Not Found');

    return {message: 'delete success'};
}

module.exports = {
    getAllUser,
    getUserById,
    getMe,
    updateUser,
    deleteuser
}