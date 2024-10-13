"use client";

import Image from "next/image";

interface IProps {
  images: string[];
}

export default function ImageInModal({ images }: IProps) {
  return (
    <div
      className={` mt-2 gap-2 grid place-items-center ${
        images.length === 1 ? "grid-cols-1" : "grid-cols-2"
      } `}
    >
      {images?.map((image, index) => (
        <div
          key={index}
          className={`w-full ${
            images.length === 3 && index === 0 ? "col-span-2" : "col-span-1"
          }`}
        >
          <Image
            alt={`image-${index}`}
            className="h-[400px] w-full object-cover"
            height={500}
            src={image}
            width={500}
          />
        </div>
      ))}
    </div>
  );
}
