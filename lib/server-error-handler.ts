import { AxiosError } from 'axios';
import mongoose from 'mongoose';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const serverErrorHandler = (error: unknown, res: NextApiResponse) => {
  if (!(error instanceof Error)) {
    throw error;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      message: error.message,
    });
    return;
  }

  if (error instanceof AxiosError) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data.message || error.message,
    });
    return;
  }

  res.status(500).json({
    message: error.message,
  });
};

export const withErrorHandler = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handler(req, res);
  } catch (error) {
    serverErrorHandler(error, res);
  }
};
