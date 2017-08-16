import mongoose, { Schema } from 'mongoose';

const candidateSchema = new Schema({
  email: { type: String, unique: true },
}, {
  toJSON: {
    virtuals: true,
  },
},
);

const userModel = mongoose.model('Candidate', candidateSchema);

export default userModel;
