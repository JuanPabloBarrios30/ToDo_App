import cors from "cors"
import morgan from "morgan";
import express from "express";
import allRoutes from './routes/index.js';
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan('dev'));
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', allRoutes);

export default app;