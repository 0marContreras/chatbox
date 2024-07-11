import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    score: {type: Number, required: true}
});

export default mongoose.models.reviewSchema || mongoose.model('reviews', reviewSchema);