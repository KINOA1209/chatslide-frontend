export default function WorkflowLayout({
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