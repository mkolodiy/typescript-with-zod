import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '20px' }}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
