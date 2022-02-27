import type { NextApiRequest, NextApiResponse } from "next";
import { uid } from "uid";
import Razorpay from "razorpay";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const { amount } = JSON.parse(req.body);

    try {
      const response = await razorpay.orders.create({
        payment_capture: "1",
        receipt: uid(16),
        amount: parseInt(amount) * 100,
        currency: "INR",
      });
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        status: "success",
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
  }
}
