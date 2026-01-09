import  express from "express";
import userRoute from './routes/user'
import adminRoute from './routes/admin'
import contestRoute from './routes/contest'
const app = express();

app.use('/user',userRoute)
app.use('/admin',adminRoute)
app.use('/contest',contestRoute)


app.listen(process.env.PORT ??5000);