const imageService = require('../services/imageServices');

const getAllImage = async (req, res, next) => {
    try{
        const {limit, page} = req.query;

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const params = {
            limit: parseInt(limit) || 10,
            offset: (parseInt(page) - 1) * (parseInt(limit) || 10) || 0,
            baseUrl
        }

        const images = await imageService.getAllImage(params);
        res.status(200).json(images);

    }catch(error){
        next(error);
    }
}

const getImageById = async (req, res, next) => {
    try{
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const params = {
            id:req.params.id,
            baseUrl
        };

        const image = await imageService.getImageById(params);
        res.status(200).json(image);

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

        const image = await imageService.getMe(params);
        res.status(200).json(image);
    }catch(error){
        next(error);
    }
}

const createImage = async (req, res, next) => {
    try{
        let imageData = {
            ...req.body,
            photo: req.file ? req.file.path.replace(/\\/g, '/'): null,
            user_id: req.user.id
        }

        const image = await imageService.createImage(imageData);
        image.photo = `${req.protocol}://${req.get('host')}/${image.photo}`;

        res.status(201).json(image);
    }catch(error){
        next(error);
    }
}

const updateImage = async (req, res, next) => {
    try{
        let photo = req.file ? req.file.path : null;
    
        if(photo){
            photo = photo.replace(/\\/g, '/');
        }
    
        const image = await imageService.updateImage({
            id:req.params.id,
            photo:photo,
            ...req.body
        });
        image.photo = `${req.protocol}://${req.get('host')}/${image.photo}`;
        res.status(201).json(image);

    }catch(error){
        next(error);
    }
}

const deleteImage = async (req, res, next) => {
    try{
        await imageService.deleteImage(req.params.id);
        res.status(204).send();
    }catch(error){
        next(error);
    }
}

module.exports = {
    getAllImage,
    getImageById,
    getMe,
    createImage,
    updateImage,
    deleteImage
}