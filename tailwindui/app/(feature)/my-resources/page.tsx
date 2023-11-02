import NewMyFiles from '@/components/newFileManagement'
import { FileUploadButton } from '@/components/fileUpload'
import { CarbonConnect, IntegrationName } from 'carbon-connect'
import { Transition } from '@headlessui/react'
import MyResourcePageHeader from './MyResourcePageHeader'
export const metadata = {
  title: 'Resources - DrLambda',
  description: 'Convert your documents to slides',
}

export default function FileManagement() {
  return (
    <>
      <MyResourcePageHeader />
      <NewMyFiles selectable={false} />
    </>
  )
}
