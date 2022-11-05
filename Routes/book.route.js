// Import the modules from package
import { Router } from 'express';
const router = Router();
import Book from '../Models/book.model.js';
import {Header, Response} from '../Models/response.model.js';

// Get all books
router.get('/all', async(req, res, next) => {

    try {
        const list = await Book.find();
        res.send(Response(Header(0, null, null), {books: list}));
    } catch (error) {
        res.status(200).json(
            Response(Header(1, error.status, error.message))
        );
    }
});

router.post('/', async(req, res, next) => {
    try {
        const book = Book(
            req.body
        );
        
        await book.save();
            res.status(200).json(
                Response(Header(0, null, null), {
                    message: "Book created!"
                })
            );
        

    } catch (error) {
        // Check if error is from joi validation then send unaccessible property error
        if(error.isJoi === true) error.status = 422;
        res.status(200).json(
            Response(Header(1, error.status, error.message))
        );
    }
});


//Search book by title
router.get('/:title', async(req, res, next) => {
        Book.findOne({title: req.params.title })
            .then(doc => {
            if (doc) {
                res.status(200).json(
                    Response(Header(0, null, null), {book: doc,})
                );
            } else {
                res.status(200).json(
                    Response(Header(1, 404, "No entry found for provided title"),)
                )
            }
            })
            .catch(err => {
                res.status(200).json(
                    Response(Header(1, err.status, err.message))
                );
            });
});

router.put('/:id', async(req, res, next)=>{
    
//const result = await customerSchema.validateAsync(req.body);
        Book.findOneAndUpdate({ id: req.params.id }, {
            $set: {
                title: req.body.title 
            }
        })
            .then(result => {
                res.status(200).json(Response(Header(0, null, null), {
                customer: result
                }))
        })
        .catch(err => {
            res.status(200).json(
                Response(Header(1, err.status, err.message))
            );
        });
});



export default router;