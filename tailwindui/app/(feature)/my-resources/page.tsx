import MyFiles from '@/components/fileManagement';

export const metadata = {
    title: 'Resources - Dr. Lambda',
    description: 'Create new content',
  }

export default function FileManagement() {
    return (<MyFiles selectable={false}/>);
}