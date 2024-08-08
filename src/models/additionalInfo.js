import mongoose from 'mongoose';

const additionalInfo = new mongoose.Schema({
    Additional_info: {type: String},
});

//additionalInfo.set('collection', 'additionalInfo')

export default mongoose.models.additionalInfo || mongoose.model('additionalInfo', additionalInfo);