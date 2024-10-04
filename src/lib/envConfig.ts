export const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  url:
    process.env.NODE_ENV === "production"
      ? (process.env.NEXT_PUBLIC_API_URL as string)
      : ("http://localhost:3000" as string),

  mongodbUri: process.env.MONGODB_URI as string,
};
