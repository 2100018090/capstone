const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  nama_wisata: { type: String, required: true },
  kota: { type: String, required: true },
  kategori: { type: String, required: true },
  rating: { type: String, required: true },
  harga_masuk: { type: String, required: true },
  deskripsi: { type: String, required: true },
  gambar: { type: String, required: true },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
