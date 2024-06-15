const Tour = require("../models/tour");
const axios = require('axios');

const addTours = async (req, res) => {
  const tours = new Tour({
    nama_wisata: req.body.nama_wisata,
    kota: req.body.kota, 
    kategori: req.body.kategori,
    rating: req.body.rating,
    harga_masuk: req.body.harga_masuk,
    deskripsi: req.body.deskripsi,
    gambar: req.body.gambar,
  });

  try {
    const addTour = await tours.save();
    res.status(201).json({ addTour, message: "wisata berhasil ditambahkan" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllTour = async (req, res) => {
  try{
  const users = await Tour.find(
    {},
    { _id: "$_id", nama_wisata: "$nama_wisata", kota: "$kota",  kategori: "$kategori", rating: "$rating",harga_masuk: "$harga_masuk", deskripsi: "$deskripsi", gambar: "$gambar" }
  );
  res.status(200).json(users);
} catch (err) {
  res.status(404).json({
    message: err.message,
  });
  }
};

const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findOne({ _id: req.params.id });
    if (!tour) {
      throw new Error("id not found");
    }
    res.status(200).json({
      tour,
      message: "wisata ditemukan",
    });
  } catch (err) {
    res.status(404).json({
      // message: err.message,
      message: "id not found",
    });
  }
};

const getRecommendedTour = async (req, res) => {
  try {
    const { City } = req.body;
    // console.log(`City: ${City}`);
    // console.log(`URL_ML_HOTEL: ${process.env.URL_ML_HOTEL}`);

    const predictResponse = await axios.post(
      process.env.URL_PREDICT_WISATA,
      { City },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const predictData = predictResponse.data.data;

    // Ambil data wisata dari database berdasarkan nama tempat yang direkomendasikan
    const recommendedTours = await Tour.find({ nama_wisata: { $in: predictData.map(place => place.Place_Name) } });

    return res.status(200).json({
      data: recommendedTours,
    });
  } catch (error) {
    console.error(`Error predicting Wisata: ${error.message}`);
    return res.status(500).json({
      code: '500',
      status: 'Internal Server Error',
      errors: {
        message: 'An error occurred while fetching recommended tours',
      },
    });
  }
};

const reqError = (req, res) => {
  res
    .status(400)
    .json({ status: 400, message: "cannot request with this end point" });
};

module.exports = {
  getRecommendedTour,
  getTourById,
  getAllTour,
  addTours,
  reqError,
};
