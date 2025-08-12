// Backend/model/Form.js
import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  questionText: { type: String },
  imageUrl: { type: String },
  options: [String],
  categories: [String],
  items: [String],
  blanks: [String],
  passage: String
});

const FormSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    headerImage: { type: String },
    questions: [QuestionSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Form", FormSchema);
