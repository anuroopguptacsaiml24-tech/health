import "../styles/globals.css";

export const metadata = {
  title: "Healthcare Symptom Checker",
  description: "Educational symptom checker using Hugging Face + FastAPI backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
