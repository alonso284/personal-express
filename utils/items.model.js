import mongoose from "mongoose";

const schema = mongoose.Schema;
const itemSchema = schema(
  {
    name: { type: String, default: "", unique: true, trim: true },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("item", itemSchema);
