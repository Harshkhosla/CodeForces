import  express from "express";
import userRoute from './routes/user'
import adminRoute from './routes/admin'
import contestRoute from './routes/contest'
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json())
app.use('/user',userRoute)
app.use('/admin',adminRoute)
app.use('/contest',contestRoute)


if (!process.env.USER_JWT_PASSWORD || !process.env.EMAIL_JWT_PASSWORD) {
	console.warn('Warning: JWT secrets may not be configured in environment variables.');
}

app.listen(process.env.PORT ?? 5000);