import MyFiles from '@/components/fileManagement';

export const metadata = {
    title: 'My Resources - DrLambda',
    description: 'Manage your docuemtns, images, and resources',
  }

export default function FileManagement() {
    return (<MyFiles selectable={false}/>);
}