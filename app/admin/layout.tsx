export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-40 font-inter antialiased [&_h1]:font-inter [&_h2]:font-inter [&_h3]:font-inter [&_h4]:font-inter [&_h5]:font-inter [&_h6]:font-inter">
      {children}
    </div>
  )
}
