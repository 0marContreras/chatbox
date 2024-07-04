import mongoose from 'mongoose';

const additionalInfo = new mongoose.Schema({
    Additional_info: {type: String},
});

export default mongoose.models.additionalInfo || mongoose.model('additionalInfo', additionalInfo);