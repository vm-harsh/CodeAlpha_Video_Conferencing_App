const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        if(!process.env.MONGO_URI){
            console.log("MONGO_URI missing.");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGO_DB CONNECTED SUCCESSFULLY`);
    } catch (error) {
        console.log(`MONGO_DB CONNECTION ERROR`, error);
        process.exit(1);
    }
}


module.exports = connectDB