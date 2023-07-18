require('dotenv').config();
const app =  require("./app");
const port = process.env.PORT;
const connectToDatabase = require('./db/db');

// Inisialisasi koneksi basis data
connectToDatabase();
 
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error("Unhandle promise rejections: ", err.message);
    server.close(() => process.exit(1));
});
