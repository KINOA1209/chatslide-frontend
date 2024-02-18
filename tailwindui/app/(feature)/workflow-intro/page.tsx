// this page is removed, redirect to /dashboard for seo purposes
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectToDashboard: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /dashboard after the component mounts
    router.push('/dashboard');
  }, [router]);

  // This component doesn't need to render anything since it redirects immediately
  return null;
};

export default RedirectToDashboard;
