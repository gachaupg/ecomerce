import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number},
  image: { type: Object, required: true },
  No: { type: Number },
  location: { type: String, required: true },
  creator: String,
 
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const TourModal = mongoose.model("Tour", tourSchema);

export default TourModal;
