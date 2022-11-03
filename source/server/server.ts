import express from 'express';
import connectToMongo from './mongoDB/connectToDB';
import cors from 'cors';
import { userRouter } from './routes/userRoutes/userRoutes';
import { leaderOfRouter } from './routes/userRoutes/leaderOfRoutes';
import { memberOfRouter } from './routes/userRoutes/memberOfRoutes';
import ErrorHandler from './errorHandler/errorHandler';
import announcementRouter from './routes/announcementRoutes';

const app = express();
app.use(express.static('dist'));
app.use(express.json());
app.use(cors());

app.use('/', userRouter);
app.use('/leaderOf', leaderOfRouter);
app.use('/memberOf', memberOfRouter);
app.use('/announcements', announcementRouter);
app.use(ErrorHandler);

const port = 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectToMongo();
});
