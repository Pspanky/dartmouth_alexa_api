import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: String,
});

const userModel = mongoose.model('user', userSchema);

export default userModel;
