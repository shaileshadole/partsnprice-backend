import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parts: [
    {
      part: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parts",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  submitDate: {
    type: Date,
    required: false,
    default: () => {
      const now = new Date();
      now.setDate(now.getDate() + 7); // add 7 days
      return now;
    },
  },
},{ timestamps: true });

export const Project = mongoose.model("Project", projectSchema);
