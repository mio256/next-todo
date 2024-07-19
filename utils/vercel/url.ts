export default function baseURL(): string {
  if (process.env.VERCEL_URL) {
    if (process.env.VERCEL_ENV === "production") {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    } else {
      return `https://${process.env.VERCEL_URL}`;
    }
  }
  return "http://localhost:3000";
}
