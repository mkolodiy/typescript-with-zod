import { useQuery } from '@tanstack/react-query';
import { ZodError } from 'zod';
import { getUsersResponseSchema } from '../../user';
import { UserCard } from '../../components/user-card';
import { useRouter } from 'next/router';

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

      // Option 1
      // const text = await response.text();
      // const converted = superjson.parse(
      //   `{"json":${text},"meta":{"values":{"0.birthday":["Date"], "1.birthday":["Date"]}}}`
      // );

      // Option 2
      const json = await response.json();

      return getUsersResponseSchema.parse(json);
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
        <div onClick={() => router.push(`/users/${user.id}`)} key={user.id}>
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
}
