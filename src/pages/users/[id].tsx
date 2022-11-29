import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ZodError } from 'zod';
import { AdditionalFieldsForm } from '../../components/additional-fields-form';
import { UserCard } from '../../components/user-card';
import { getUserResponseSchema } from '../../user';

export default function User() {
  const router = useRouter();
  const id = router.query['id'];
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: async ({ signal }) => {
      const response = await fetch(`/api/users/${router.query['id']}`, {
        signal,
      });

      // Option 1
      // const text = await response.text();
      // const converted = superjson.parse(
      //   `{"json":${text},"meta":{"values":{"birthday":["Date"]}}}`
      // );

      // Option 2
      const json = await response.json();

      return getUserResponseSchema.parse(json);
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
      <UserCard user={user} />
      <AdditionalFieldsForm user={user} />
    </div>
  );
}
