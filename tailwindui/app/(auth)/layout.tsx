import Header from '@/components/ui/header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grow">

      <Header loginRequired={false} isLanding={false} refList={[]} isAuth={true}/>
      {children}

    </main>
  )
}
