import mongoose from 'mongoose';

const wantedSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  reward_text: String,
  warning_message: String,
  sex: String,
  race: String,
  nationality: String,
  image: { type: String, required: true },
  age_range: String,
  height_min: String,
  weight: String,
  hair: String,
  eyes: String,
  place_of_birth: String,
  dates_of_birth_used: [String],
  subjects: [String],
}, {
  timestamps: true
});

const WantedPerson = mongoose.model('WantedPerson', wantedSchema);

export default WantedPerson;