import mongoose from 'mongoose';
import type { NextApiResponse } from 'next';

export const serverErrorHandler = (error: unknown, res: NextApiResponse) => {
  if (!(error instanceof Error)) {
    throw error;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    message: error.message,
  });
};
