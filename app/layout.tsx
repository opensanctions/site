import Analytics from "../components/Analytics";

import '../styles/globals.scss'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <>{children}</>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
