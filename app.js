require("dotenv").config();
const app = require("express")();
const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.set('strictQuery', false);
const port = process.env.PORT || 8080;

// dokumnetasi swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = require("./swagger");
const cookieParser = require("cookie-parser");
const specs = swaggerJsDoc(options);

require("./database");
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// module.exports.db = mongoose.connection;
// db.once('open', () => {console.log('database connected')})

// menggunakan body-parser
app.use(bodyParser.json());
// app.use(express.json)
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(userRoutes);
app.use(tourRoutes);

// app.use('/books/tambah', bookRoutes)
// app.put('/books/ubah', bookRoutes)
// app.delete('/books/hapus', bookRoutes)

const server = app.listen(port, () => {
  console.log(`app listen at http://localhost:${port}`);
  // console.log(`app listen at *:${port}`);
});

module.exports = { app, server };
