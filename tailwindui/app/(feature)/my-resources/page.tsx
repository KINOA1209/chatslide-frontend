import FileManagementClient from '@/app/(feature)/my-resources/page_client'
export const metadata = {
  title: 'My Resources - DrLambda',
  description: 'Convert your documents to slides',
}


export default function FileManagementServer() {
  return (
    <div className='h-screen'>
      <FileManagementClient />
    </div>
  )
}
