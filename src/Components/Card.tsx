"use client";

import { Image, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import NextImage from "next/image";

export default function Card({
  item,
  idx,
}: {
  item: { name: string; description: string; image: string };
  idx: number;
}) {
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchFormationsCount = async () => {
      const response = await fetch(`/api/category/${idx}?count=true`, {
        cache: "no-cache",
      });
      const { formationsCount } = await response.json();
      setCount(formationsCount);
      setLoaded(true);
    };

    fetchFormationsCount();
  }, []);

  return (
    <div
      key={idx}
      className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-100  text-start"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-x-3">
          <div className="bg-white w-14 h-14 border rounded-full flex items-center justify-center overflow-hidden">
            <Image
              as={NextImage}
              sizes="100%"
              width={0}
              height={0}
              className="object-cover w-14 h-14 "
              src={item.image || "/defaultImage.jpg"}
              alt={item.name}
            />
          </div>
          <div>
            <span className="block text- text-indigo-600 font-medium">
              {item.name}
            </span>
            {loaded ? (
              <h3 className="text-xs  font-semibold mt-1 bg-green-600/20 w-fit px-3 py-1 text-green-600 rounded-full">
                {count + " Formation"}
              </h3>
            ) : (
              <Skeleton className="text-xs  font-semibold mt-1 px-3 py-1 rounded-full h-4 w-24" />
            )}
          </div>
        </div>
        <p className="text-gray-600 sm:text-sm line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
}
