import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>typescript-with-zod</h1>
      <p>
        <b>Solutions</b>
      </p>
      <ul>
        <li>
          <Link href="/typescript/users">TypeScript</Link>
        </li>
        <li>
          <Link href="/zod/users">zod</Link>
        </li>
      </ul>
    </>
  );
}
