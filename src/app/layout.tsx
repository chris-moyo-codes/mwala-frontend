import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { ToastContainer } from 'react-toastify' // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'Mwala - Build your business on solid ground',
  description: 'Business finance and record-keeping platform for SMEs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body> {/* Root layout for the application */}
        <ToastContainer 
          position="top-right" 
          autoClose={4000} 
          hideProgressBar={false} 
          newestOnTop 
          closeOnClick 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
          theme="light" 
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
