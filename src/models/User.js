import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  twoFactorSecret: { type: String },
  twoFactorCode: { type: String },
  codeExpiresAt: { type: Date },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);