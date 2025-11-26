import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    }
})

export const Payment = mongoose.model("Payment", paymentSchema);