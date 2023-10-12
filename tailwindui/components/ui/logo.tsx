import Image from "next/image";
import logo from "@/public/new_landing/svgs/drlambda-logo.svg";

export default function Logo() {
    return (
      <a href="/" className="block" aria-label="Cruip">
        <img src="/new_landing/svgs/drlambda-logo.svg" alt="DrLambda" className="w-16 h-16" />
      </a>
    );
  }
  