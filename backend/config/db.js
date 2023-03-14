require('dotenv').config();
const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        })
            .then(() => console.log('MongoDB connected successfully'))
            .catch((error) => {
                console.log("Database Connection Failed. Exiting now...");
                console.error(error);
                process.exit(1);
        })


        
    } catch(error) {
        console.log('MOngoDB failed to connect', error);
        process.exit(1);
    }
}

module.exports = connectDB;