import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/zod/users',
    },
    props: {},
  };
};

export default function Zod() {
  return <>Typescript example</>;
}
