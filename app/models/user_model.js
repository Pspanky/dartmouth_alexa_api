import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, unique: true },
}, {
  toJSON: {
    virtuals: true,
  },
},
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
