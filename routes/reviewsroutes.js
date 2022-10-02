const express = require('express');
const router = express.Router({mergeParams: true});
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Books = require('../models/books');
const Review = require('../models/review');
const reviewsControl= require('../controllers/reviews');
const ExpressErrors = require('../helpers/ExpressError');
const catchAsync = require('../helpers/catchAsync');


router.post('/', isLoggedIn, validateReview, catchAsync(reviewsControl.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewsControl.deleteReview));

module.exports = router;
