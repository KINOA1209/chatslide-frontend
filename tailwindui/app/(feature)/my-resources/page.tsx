import MyFiles from '@/components/newFileManagement'
import MyResourcePageHeader from '@/app/(feature)/my-resources/MyResourcePageHeader'
export const metadata = {
  title: 'My Resources - DrLambda',
  description: 'Convert your documents to slides',
}

export default function FileManagement() {
  return (
    <>
      <MyResourcePageHeader />
      <MyFiles selectable={false} />
    </>
  )
}
