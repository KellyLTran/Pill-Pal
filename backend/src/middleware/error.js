
export const handleError = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Handle specific known errors
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Handle unexpected errors
  return res.status(500).json({ error: 'Internal Server Error' });
}