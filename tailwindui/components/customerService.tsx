import React from 'react';
import Link from "next/link";

const email = "mail@quanlai.li"

export default function CustomerServiceInfo(): JSX.Element {
    return <div>
        <div className="flex items-center my-6">
            <div
                className="border-t border-gray-300 grow mr-3"
                aria-hidden="true"
            ></div>
        </div>
        Still can't login or sign up?<br></br>
        Contact our <Link
            href={"mailto:" + email}
            className="text-blue-600 hover:underline transition duration-150 ease-in-out"
        >
            customer support
        </Link> for all your account related issues.
    </div>
}