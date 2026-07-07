require('dotenv').config();
const http = require('http');
const app = require('./src/app')
const connectDB = require('./src/db/db');
const port = process.env.PORT || 3000;






const startServer = async () => {
    try {
        await connectDB();

        const server = http.createServer(app);

        server.listen(port, ()=>{
            console.log(`server is listening on port ${port}`)
        })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


startServer();
