export const sendSuccess = (res: any, message: string, data?: any) => {
  const payload: any = { message };

  if (data !== undefined) {
    payload.data = data;
  }

  return res.status(200).json(payload);
};

export const sendCreated = (res: any, message: string, data?: any) =>
  res.status(201).json({ message, data });

export const sendBadRequest = (res: any, message: string) =>
  res.status(400).json({ message });

export const sendNotFound = (res: any, message: string) =>
  res.status(404).json({ message });

export const sendServerError = (res: any, error: any) =>
  res.status(500).json({ message: error?.message || "Internal Server Error" });



export default {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendNotFound,
  sendServerError,
};
