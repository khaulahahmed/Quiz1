import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import createError from 'http-errors';
import { config } from 'dotenv';
import {} from './helpers/init_mongodb.js';

import Auth_Route from './Routes/auth.route.js';
import book_Route from './Routes/book.route.js';

import { verifyAccessToken } from './helpers/jwt_helper.js';

const app = express();
config();

app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({extended:true}));

// Root Route
app.get('/', verifyAccessToken, async(req, res, next) => {
    res.send('Hello World! \nYou are at the root route\nYou have Authorised access.');
});

// Book Route
//app.use('/book', book_Route);
app.use('/book',verifyAccessToken, book_Route);

// Auth Route
app.use('/auth', Auth_Route);

// Error Handler
app.use(async(req, res, next) => {
    next(createError.NotFound("Not Found Error"));
});

app.use(async(err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
});


// Start Server to listen
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});