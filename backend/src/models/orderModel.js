import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    // 1. Link the order to the User who bought it
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    // 2. The items in the cart
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    // 3. Where to ship it (Data from your Shipping Page)
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    // 4. Payment Info
    paymentMethod: {
      type: String,
      required: true, // e.g., "PayPal" or "Stripe"
    },
    // We update this result AFTER the payment gateway confirms success
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    // 5. Money Math
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },

    // 6. Status Flags
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;