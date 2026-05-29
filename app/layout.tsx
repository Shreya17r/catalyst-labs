// @ts-nocheck
import { Nunito, Fraunces } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-nunito',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata = {
  title: 'Catalyst Labs — Screen-Free Play Systems for Children',
  description:
    'Three wooden play systems for children aged 1–6. Built around real developmental milestones — not to look good on a shelf, but to actually get played with.',
  openGraph: {
    title: 'Catalyst Labs — Screen-Free Play Systems for Children',
    description: 'Wooden toys that kids actually keep playing with.',
    url: 'https://catalystlabs.in',
    siteName: 'Catalyst Labs',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  )
}
