import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@/app/ui/global.css'
import { Toaster } from 'sonner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: 'Safecide - Hackatec Aurora',
  description: ''
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={`${poppins.className} bg-blanco`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
