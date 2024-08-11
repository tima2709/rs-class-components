import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RS school app',
  description: 'hello world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

// <script type='module' src='/src/main.tsx'></script>
