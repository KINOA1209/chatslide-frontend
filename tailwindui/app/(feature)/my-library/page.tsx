import FileManagementClient from '@/app/(feature)/my-library/page_client'
export const metadata = {
  title: 'My Library - DrLambda',
  description: 'Convert your documents to slides',
}


export default function FileManagementServer() {
  return (
    <div className='h-screen'>
      <FileManagementClient />
    </div>
  )
}
