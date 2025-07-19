export const IP_INFO_TOKEN = process.env.IP_INFO_TOKEN as string;

if (!IP_INFO_TOKEN) {
  throw new Error("Missing IP_INFO_TOKEN environment variable");
}