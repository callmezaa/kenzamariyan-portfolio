const DEFAULT_SITE_URL = "https://kenzamariyan.is-a.dev";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
export const SITE_HOSTNAME = SITE_URL.replace(/^https?:\/\//, "");
