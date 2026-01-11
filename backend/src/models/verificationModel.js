import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 } // Auto-delete after 10 mins (600 seconds)
});

const Verification = mongoose.model("Verification", verificationSchema);
export default Verification;