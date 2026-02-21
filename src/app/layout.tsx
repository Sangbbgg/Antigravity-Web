import "./globals.css";

export const metadata = {
  title: "Antigravity MVP",
  description: "Simplifying to fix build error",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
