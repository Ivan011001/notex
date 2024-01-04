import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-5xl">
      <div className="flex tems-center">
        <div className="relative w-[300px] h-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/documents.png"
            alt="Documets"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src="/documents-dark.png"
            alt="Documets"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
        <div className="relative w-[400px] h-[400px] hidden md:block ">
          <Image
            src="/reading.png"
            alt="Documets"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src="/reading-dark.png"
            alt="Documets"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
      </div>
    </div>
  );
};
