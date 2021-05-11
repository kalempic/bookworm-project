const express = require('express');
const router = express.Router({mergeParams: true});
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Books = require('../models/books');
const Review = require('../models/review');
const reviewsControl= require('../controllers/reviewscontrol');
const ExpressErrors = require('../helpers/ExpressErrors');
const catchAsync = require('../helpers/CatchAsync');


router.post('/', isLoggedIn, validateReview, catchAsync(reviewsControl.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewsControl.deleteReview));

module.exports = router;