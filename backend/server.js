require('dotenv').config();
const app =  require("./app");
const port = process.env.PORT;
const errorHandlers = require('./utils/errorHandlers');
const connectToDatabase = require('./db/db');

// Inisialisasi koneksi basis data
connectToDatabase();
 
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Menggunakan errorHandlers.handleNotFound sebagai middleware untuk menangani 404 Not Found
app.use(errorHandlers.handleNotFound);

// Menggunakan errorHandlers.handleErrors sebagai middleware untuk menangani kesalahan lainnya
app.use(errorHandlers.handleErrors);


// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error("Unhandle promise rejections: ", err.message);
    server.close(() => process.exit(1));
});
