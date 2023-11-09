import MyFiles from '@/components/fileManagement'

export const metadata = {
  title: 'Resources - DrLambda',
  description: 'Convert your documents to slides',
}

export default function FileManagement() {
  return <MyFiles selectable={false} />
}
