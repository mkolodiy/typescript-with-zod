import { useQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';
import type { GetUsersResponse } from '../../../typescript/user';
import { UserCard } from '../../../typescript/components/user-card';
import { useRouter } from 'next/router';
import { castArr } from '../../../typescript/utils';

export default function Users() {
  const router = useRouter();
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async ({ signal }) => {
      const response = await fetch('/api/users', { signal });
      const json = await response.json();
      return castArr(json) as GetUsersResponse;
    },
    retry: false,
  });

  if (isLoading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  if (isError) {
    if (error instanceof ZodError) {
      return (
        <div style={{ padding: '20px' }}>
          <h1>Error</h1>
          {JSON.stringify(error.format())}
        </div>
      );
    }

    return <div style={{ padding: '20px' }}>Error...</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <div
          onClick={() => router.push(`/typescript/users/${user.id}`)}
          key={user.id}
        >
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
}
