import Image from "next/image";
import logo from "@/public/images/logo_no_text.png";

export default function Logo() {
  return (
    <a href="/" className="block" aria-label="Cruip">
      <Image src={logo} alt="Dr. Lambda" className="w-16 h-16" />
    </a>
  );
}
