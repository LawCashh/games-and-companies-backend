import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  releaseYear: Number,
  companyId: {
    type: mongoose.Schema.Types.ObjectId || null,
    ref: 'Company',
  },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
