const KV_KEY = "visitor_count";

let fallbackCount = 4283;

let cachedCount: number | null = null;
let cachedAt = 0;
const CACHE_TTL = 5000;

function getCached(): number | null {
  if (cachedCount !== null && Date.now() - cachedAt < CACHE_TTL) {
    return cachedCount;
  }
  return null;
}

function setCached(value: number) {
  cachedCount = value;
  cachedAt = Date.now();
}

function getClient() {
  const { REDIS_URL, KV_URL, UPSTASH_REDIS_REST_URL } = process.env;
  const url = UPSTASH_REDIS_REST_URL || KV_URL || REDIS_URL;
  if (!url) return null;
  return url;
}

function getToken() {
  return process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "";
}

async function redisGet(): Promise<number | null> {
  const url = getClient();
  if (!url) return null;
  try {
    const res = await fetch(`${url}/get/${KV_KEY}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const val = data.result;
    return val !== null ? Number(val) : null;
  } catch {
    return null;
  }
}

async function redisSet(value: number): Promise<boolean> {
  const url = getClient();
  if (!url) return false;
  try {
    const res = await fetch(`${url}/set/${KV_KEY}/${value}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function redisIncr(): Promise<number | null> {
  const url = getClient();
  if (!url) return null;
  try {
    const res = await fetch(`${url}/incr/${KV_KEY}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Number(data.result);
  } catch {
    return null;
  }
}

export async function getVisitorCount(): Promise<number> {
  const cached = getCached();
  if (cached !== null) return cached;
  const redis = await redisGet();
  if (redis !== null) {
    setCached(redis);
    return redis;
  }
  return fallbackCount;
}

export async function incrementVisitor(): Promise<number> {
  const count = await redisIncr();
  if (count !== null) {
    fallbackCount = count;
    setCached(count);
    return count;
  }
  fallbackCount += 1;
  setCached(fallbackCount);
  return fallbackCount;
}
