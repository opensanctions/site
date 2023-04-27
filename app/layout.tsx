import '../styles/globals.scss'

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
        <>{children}</>
      </body>
    </html>
  );
}
