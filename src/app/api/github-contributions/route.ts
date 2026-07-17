let cache: { data: ResponseData; ts: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000;

interface DayData {
  date: string;
  count: number;
  level: number;
}

interface WeekData {
  days: DayData[];
}

interface ResponseData {
  total: number;
  weeks: WeekData[];
}

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const QUERY = `
query($from: DateTime!, $to: DateTime!) {
  user(login: "callmezaa") {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            color
          }
        }
      }
    }
  }
}
`;

function toDateString(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return Response.json(cache.data);
  }

  const now = new Date();
  const from = new Date(now);
  from.setFullYear(from.getFullYear() - 1);

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return Response.json({ total: 0, weeks: [] });
  }

  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        from: from.toISOString(),
        to: now.toISOString(),
      },
    }),
  });

  if (!res.ok) {
    return Response.json({ total: 0, weeks: [] });
  }

  const json = await res.json();
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!cal) {
    return Response.json({ total: 0, weeks: [] });
  }

  const data: ResponseData = {
    total: cal.totalContributions,
    weeks: cal.weeks.map((w: { contributionDays: { date: string; contributionCount: number; color: string }[] }) => ({
      days: w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: Math.min(d.contributionCount, 4),
      })),
    })),
  };

  cache = { data, ts: Date.now() };
  return Response.json(data);
}
