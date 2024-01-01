import Image from "next/image";
import Link from "next/link";

const Logo: any = (props: { className?: string }) => {
  return (
    <div className={props.className}>
      <Link href="/" className="cursor-pointer ">
        <div className="flex gap-4 items-center">
          <h1 className="font-semibold text-2xl  text-[transparent] bg-clip-text bg-gradient-to-br from-deepBlue to-primaryBlue uppercase">
            Desafio Técnico
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
