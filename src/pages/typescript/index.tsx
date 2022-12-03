import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/typescript/users',
    },
    props: {},
  };
};

export default function TypeScript() {
  return <>Typescript example</>;
}
