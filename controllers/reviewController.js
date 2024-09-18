const reviewServices = require('../services/reviewServices');

const getAllReview = async (req, res, next) => {
    try{
        const response = await reviewServices.getAllReview(req.params.id);
        res.status(200).json(response);

    }catch(error){
        next(error);
    }
}

const createReview = async (req, res, next) => {
    try{
        const reviewData = {
            ...req.body,
            user_id:req.user.id,
            image_id:req.params.id
        }

        const response = await reviewServices.createReview(reviewData);
        res.status(201).json(response);

    }catch(error){
        next(error);
    }
}

const updateReview = async (req, res, next) => {
    try{
        const reviewData = {
            id:req.params.id,
            ...req.body
        }

        const review = await reviewServices.updateReview(reviewData);
        res.status(201).json(review);

    }catch(error){
        next(error);
    }
}

const deleteReview = async (req, res, next) => {
    try{
        const response = await reviewServices.deleteReview(req.params.id);
        res.status(204).send();
        
    }catch(error){
        next(error);
    }
}

module.exports = {
    getAllReview,
    createReview,
    updateReview,
    deleteReview
}