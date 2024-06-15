const tourRoutes = require("express").Router();
const {
  getRecommendedTour,
  getTourById,
  getAllTour,
  addTours,
  reqError,
} = require("../controller/tourController");
const { verifyToken, verifyRole2 } = require("../middleware/auth");


tourRoutes.get("/gettour", getAllTour);
tourRoutes.post("/tour", addTours);
tourRoutes.get("/tour/id/:id",verifyToken, getTourById);
tourRoutes.post("/recommendedHotels",verifyToken, getRecommendedTour);

tourRoutes.use("/", reqError);

module.exports = tourRoutes;
