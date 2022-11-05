import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    featured_image: String,
    image: String,
    date_formatted: String,
    title: String,
    is_favorite: Boolean,
    categories: [{
        id: Number,
        title: String,
    }]
});

const Book = mongoose.model('books', bookSchema);
export default Book;

