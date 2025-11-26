import ErrorHandler from "../middlewares/error.js";
import { Payment } from "../models/paymentModel.js";
import { Project } from "../models/projectModel.js";

export const addPayment = async (req, res, next) => {
  try {
    const { amount, date } = req.body;
    const projectId = req.params.projectId;

    // Basic validation
    if (amount == null || isNaN(Number(amount))) {
      return next(new ErrorHandler("Invalid amount", 400));
    }

    const project = await Project.findById(projectId);
    if (!project) return next(new ErrorHandler("Project not Found", 404));

    // Normalize date (optional)
    const paymentDate = date ? new Date(date) : new Date();

    const payment = await Payment.create({
      amount: Number(amount),
      date: paymentDate,
      projectId: project._id,
    });

    res.status(200).json({
      success: true,
      message: "New Payment added",
      payment,
    });
  } catch (error) {
    next(error);
  }
};

export const getPayment = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;

    const project = await Project.findById(projectId);
    if (!project) return next(new ErrorHandler("Project not found", 404));

    const paymentArray = (await Payment.find({ projectId })).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      message: "Payment Fetched Successfully",
      paymentArray,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { amount, date } = req.body;

    // Validate
    if (amount != null && isNaN(Number(amount))) {
      return next(new ErrorHandler("Invalid amount", 400));
    }

    const payment = await Payment.findById(paymentId);
    if (!payment) return next(new ErrorHandler("Payment Not Found!", 404));

    payment.amount = amount;
    payment.date = date ? new Date(date) : payment.date;
    payment.save();

    res.status(200).json({
      success: true,
      message: "Payment Updated Successfully",
      payment
    });
  } catch (error) {
    next(error);
  }
};

export const deletePayment = async (req, res, next) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment) return next(new ErrorHandler("Payment Not Found", 404));

    await Payment.findByIdAndDelete(paymentId);

    res.status(200).json({
      success: true,
      message: "Payment Deleted Successfully!",
    });
  } catch (error) {
    next(error);
  }
};
