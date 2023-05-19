import '../styles/globals.scss'
import { NextAuthProvider } from "./providers";

export const metadata = {
  title: {
    template: '%s - OpenSanctions',
    default: 'OpenSanctions'
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
