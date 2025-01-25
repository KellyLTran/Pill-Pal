export const handleError = (err, req, res, next) => {
  // Log the error for debugging purposes (you can enhance this with more details)
  console.error(err.stack);

  // If it's a known error, handle it based on the error type
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // If the error is a validation error (e.g., from mongoose or a custom validation), handle it
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Validation error', details: err.errors });
  }

  // Handle MongoDB duplicate key errors (useful for things like unique email)
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Duplicate key error', details: err.keyValue });
  }

  // For authentication errors, you can send a specific response
  if (err.name === 'AuthenticationError') {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  // For authorization errors, you can send a specific response
  if (err.name === 'AuthorizationError') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // If it's any other error, return a generic 500 Internal Server Error
  return res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message,
  });
};
