import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import  formRoute  from './routes/formRoutes.js';
import responseRoutes from './routes/responseRoute.js';
import uploadRoute from './routes/uploadRoute.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// MongoDB connection
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected To MongoDB");
} catch (error) {
  console.log("MongoDB Connection Error: ", error);
}

app.use('/api/forms', formRoute);
app.use('/api/responses', responseRoutes);
app.use('/api/upload', uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
