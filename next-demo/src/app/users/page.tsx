'use client';

import useSWR from 'swr';

export default function UsersPage() {
  const { data, isLoading } = useSWR(`/api/users`);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
