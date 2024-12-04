import Image from "next/image";
import logo from "@/public/logo.webp";
import Link from "next/link";
const Logo = ({ locale }: { locale: string }) => {
  return (
    <Link
      href={`/${locale}`}
      prefetch={false}
      className="flex justify-center items-center w-[30px] h-[30px] bg-secondary  rounded-md p-1"
    >
      <div className="flex justify-center items-center w-[30px] h-[30px] bg-secondary rounded-lg z-10">
        <Image
          src={logo}
          alt={"Dream To App"}
          width={30}
          height={30}
          className="w-auto h-auto object-cover"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;
