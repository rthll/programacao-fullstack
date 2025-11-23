import mongoose from 'mongoose';

const wantedPersonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  reward_text: { type: String, required: true },
  warning_message: { type: String, required: true },
  sex: { type: String, enum: ['Male', 'Female'], required: true },
  race: { type: String, required: true },
  nationality: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('WantedPerson', wantedPersonSchema);