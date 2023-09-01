import Header from '@/components/ui/header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grow">

      <Header isLanding={false} refList={[]} />
      {children}

    </main>
  )
}
