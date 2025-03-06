import mongoose from " mongoose ";

const itemSchema = new mongoose.Schema({
	name: {type: String, unique: true, trim: true},
	priace: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
