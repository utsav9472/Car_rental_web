import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import { confirmPayment, createCheckoutSession } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post('/create-checkout-session', authMiddleware, createCheckoutSession);
paymentRouter.get('/confirm', confirmPayment)

export default paymentRouter;