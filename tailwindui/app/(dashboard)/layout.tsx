export default function DashBoardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {  
    return (
      <main className="grow">
  
        {children}
  
      </main>
    )
  }