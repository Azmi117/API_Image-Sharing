const { Review } = require('../models');

const getAllReview = async (params) => {
    const image_id = params;
    const review = await Review.findAll({
        where:{
            image_id
        }
    });

    if(!review) throw new Error('No Review Exist');

    return review;
}

const createReview = async (params) => {
    const {likes, comment, user_id, image_id} = params;

    const review = await Review.create({
        likes,
        comment,
        user_id,
        image_id
    });

    if(!review) throw new Error('Failed Create Review');

    return review;
}

const updateReview = async (params) => {
    const {id, likes, comment} = params;

    const update = await Review.update(
        {likes, comment},
        {
            where:{
                id
            }
        });
    
    if(!update) throw new Error('Review Not Found');

    const review = await Review.findByPk(id);

    return review;
}

const deleteReview = async (params) => {
    const id = params;

    await Review.destroy({
        where:{
            id
        }
    });

    return{message: 'delete success'};
}

module.exports = {
    getAllReview,
    createReview,
    updateReview,
    deleteReview
}