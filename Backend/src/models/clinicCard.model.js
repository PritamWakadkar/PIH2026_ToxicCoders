const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema(
  {
    clinicImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\..+/.test(v);
        },
        message: "Invalid image URL format",
      },
    },
    clinicName: {
      type: String,
      required: [true, "Clinic name is required"],
      minlength: [3, "Clinic name must be at least 3 characters"],
      maxlength: [100, "Clinic name cannot exceed 100 characters"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      default: "GENERAL PRACTICE",
    },

    rating: {
      type: Number,
      required: true,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
      default: 0,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
    },
  },
  {
    timestamps: true, // createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Clinic_Card", clinicSchema);