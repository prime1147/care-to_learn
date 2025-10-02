// controllers/Review.controller.js
const ReviewService = require("../services/Review.service");
const response = require("../utils/response");
const { getCachedPresignedUrl } = require("../utils/commonFunction");
const FileDocumentController = require("../controllers/FileDocument.controller"); // ✅ import once

class ReviewController {
  // --- 1. Get All Approved Reviews (for public display on the homepage) ---
  getAllApprovedReviews = async (req, res, next) => {
    try {
      let { page = 1, limit = 10, search = "" } = req.query;
      page = Number(page);
      limit = Number(limit);
      const offset = limit * (page - 1);

      const whereCondition = {
        isApproved: true,
        ...(search
          ? {
            OR: [
              { comment: { contains: search, mode: 'insensitive' } },
              { rating: { equals: parseInt(search) || 0 } },
            ],
          }
          : {}),
      };

      const options = {
        where: whereCondition,
        include: {
          user: {
            select: ["id", "firstName", "lastName", "ProfilePicture"],
          },
          course: {
            select: ["id", "title", "subtitle", "CourseImage"],
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      };

      const result = await ReviewService.findAllAndCount(options);
      return response.respondGet(result, res);
    } catch (error) {
      console.error("Error fetching approved reviews: ", error);
      return response.respondError(error, res);
    }
  };

  // --- 2. Submit a New Review (requires authentication) ---
  submitReview = async (req, res, next) => {
    try {
      req.body.userId = req.userDetails.id;
      const result = await ReviewService.add(req.body);
      return response.respondPost(result, res);
    } catch (error) {
      console.error("Error submitting review: ", error);
      return response.respondError(error, res);
    }
  };

  // --- 3. Get All Reviews (for Admin Dashboard - includes unapproved) ---
  getAllReviewsForAdmin = async (req, res, next) => {
    try {
      let { page = 1, limit = 10, search = "" } = req.query;
      page = Number(page);
      let take = Number(limit);
      const skip = limit * (page - 1);

      const whereCondition = {
        ...(search
          ? {
            OR: [
              { comment: { contains: search, mode: 'insensitive' } },
              { rating: { equals: parseInt(search) || 0 } },
            ],
          }
          : {}),
      };

      const options = {
        where: whereCondition,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              ProfilePicture: true,
            }
          },
          course: {
            select: {
              id: true,
              title: true,
              subtitle: true,
              CourseImage: true,
            }
          },
        },
        orderBy: { createdAt: 'desc' },
        take: take,
        skip: skip,
      };

      const result = await ReviewService.findAllAndCount(options);
      for (const review of result.rows) {
        if (
          review.user?.ProfilePicture ||
          review.course?.CourseImage
        ) {
          review.user.ProfilePicture = await getCachedPresignedUrl(
            FileDocumentController,
            review.user.ProfilePicture,
            300
          );
          review.course.CourseImage = await getCachedPresignedUrl(
            FileDocumentController,
            review.course.CourseImage,
            300
          );
        }
      }

      return response.respondGet(result, res);
    } catch (error) {
      console.error("Error fetching all reviews for admin: ", error);
      return response.respondError(error, res);
    }
  };

  // --- 4. Approve a Review (Admin Only) ---
  approveReview = async (req, res, next) => {
    try {
      const payload = {
        where: { id: req.body.id },
      };
      delete req.body.id;
      const result = await ReviewService.put(req.body, payload);
      if (!result) {
        return response.respondNotFound("Review not found.", res);
      }

      return response.respondPut(result, res);
    } catch (error) {
      console.error("Error approving review: ", error);
      return response.respondError(error, res);
    }
  };

  // --- 5. Delete a Review (Admin Only) ---
  deleteReview = async (req, res, next) => {
    try {
      const payload = { where: { id: req.params.id } };
      console.log("payload: ", payload);
      const result = await ReviewService.delete(payload);
      console.log("result: ", result);
      if (result === 0) {
        return response.respondNotFound("Review not found.", res);
      }

      return response.respondDelete(result, res);
    } catch (error) {
      console.error("Error deleting review: ", error);
      return response.respondError(error, res);
    }
  };
}

module.exports = new ReviewController();
