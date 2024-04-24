'use client';

import { useUser } from "@/hooks/use-user"
import Link from "next/link";
import useHydrated from '@/hooks/use-hydrated';

export const JoinUsBanner: React.FC = () => {
	const { uid } = useUser();

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	if (uid && uid !== "") {
		return null;
	}

	return (
		<Link href="/signup?ref=shared">
			<div
				className="flex items-center justify-center bg-Blue text-white text-sm sm:text-lg leading-10 tracking-wide"
				id="join-us-banner">
				Join 210k happy users to create professional slides! 🚀
			</div>
		</Link>
	);
}