import mongoose, { Schema } from 'mongoose';

const specialSchema = new Schema({
  name: String,
  location: String,
  ingredients: [String],
  meal: String,
  type: { type: String, default: 'special' },
  date: { type: Date, default: Date.now() },
}, {
  toJSON: {
    virtuals: true,
  },
},
);

const specialModel = mongoose.model('Special', specialSchema);

export default specialModel;
