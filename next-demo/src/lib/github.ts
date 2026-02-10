export async function githubFetch<T>(endpoint: string): Promise<T> {
  const token = process.env.GIT_HUB_TOKEN?.trim();

  if (!token) {
    throw new Error('github token is missing');
  }

  const response = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
