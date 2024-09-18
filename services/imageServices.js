const { Image } = require('../models');

const getAllImage = async (params) => {
    const{limit, offset, baseUrl} = params;

    const queryOptions = {
        limit: limit || 10,
        offset: offset || 0
    }

    const images = await Image.findAndCountAll(queryOptions);
    if(!images) throw new Error('No Images Exist');

    images.rows = images.rows.map((imagesData) => {
        if(imagesData.photo){
            imagesData.photo = `${baseUrl}/${imagesData.photo}`;
        }
        return imagesData;
    });

    return{
        totalImages: images.count,
        images: images.rows,
        totalPages: Math.ceil(images.count / (limit || 10)),
        pages: Math.floor((offset || 0) / (limit || 10)) + 1
    }
}

const getImageById = async (params) => {
    const {id, baseUrl} = params;

    const image = await Image.findByPk(id);
    if(!image) throw new Error('Image Not Found');

    if(image.photo){
        image.photo = `${baseUrl}/${image.photo}`;
    }

    return image;
}

const getMe = async (params) => {
    const {id, baseUrl} = params;

    const image = await Image.findOne({
        where:{
            id
        }
    })
    if(!image) throw new Error('Image Not Found');

    if(image.photo){
        image.photo = `${baseUrl}/${image.photo}`;
    }

    return image;
}

const createImage = async (params) => {
    const {caption, status, user_id, photo} = params;

    const image = await Image.create({
        caption,
        status,
        user_id,
        photo
    });

    if(!image) throw new Error('Failed create image');

    return image;
}

const updateImage = async (params) => {
    const {id, caption, status, user_id, photo} = params;

    const update = await Image.update(
        {caption, status, user_id, photo},
        {
            where:{
                id
            }
        });
    
    if(!update) throw new Error('Failed update image');

    const image = await Image.findByPk(id);

    return image;
}

const deleteImage = async (params) => {
    const id = params;

    const image = await Image.destroy({
        where:{
            id
        }
    });

    if(!image) throw new Error('Image not found');

    return{message: 'delete success'};
}

module.exports = {
    getAllImage,
    getImageById,
    getMe,
    createImage,
    updateImage,
    deleteImage
}