const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// POST Review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// DELETE Review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  // isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
