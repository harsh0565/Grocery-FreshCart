import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"]
    },
    cartItem: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true,
    minimize: false, // Correct placement inside one object
  }
);

// Correct model export (mongoose.models not mongoose.model.)
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
