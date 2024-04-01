'use client';

import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AutoRedir(){
	const { uid } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (uid) {
			router.push('/dashboard');
		} else {
			router.push('/welcome.html');
		}
	}
	), [uid];

	return null;
}