import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {

    const whitelist = [process.env.FRONTEND_URL];

    // Allow requests with no origin (like postman or curl)
    // You need to add script argument --api to the npm script and run npm run dev:api
    if (process.argv[2] === '--api') {
      whitelist.push(undefined);
    }
    console.log("CORS whitelist:", whitelist);
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};