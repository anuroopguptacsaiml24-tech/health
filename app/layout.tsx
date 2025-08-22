import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healthcare Symptom Checker',
  description: 'Educational symptom checker using Hugging Face + FastAPI backend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
