import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ZodError } from 'zod';
import { AdditionalFieldsForm } from '../../../zod/components/additional-fields-form';
import { UserCard } from '../../../zod/components/user-card';
import { getUserResponseSchema } from '../../../zod/user';

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
