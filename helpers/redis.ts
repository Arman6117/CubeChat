const upstashRedisURL = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;



type Command = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisURL}/${command}/${args.join("/")}`;

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: "no-store",
  });

  console.log(response);

  if (!response.ok) {
    console.log(response);

    throw new Error(`Error executing redis command:${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);

  return data.result;
}
