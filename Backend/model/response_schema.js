import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  questionId: String,
  answer: mongoose.Schema.Types.Mixed
});

const ResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
  answers: [AnswerSchema]
}, { timestamps: true });

export default mongoose.model("Response", ResponseSchema);