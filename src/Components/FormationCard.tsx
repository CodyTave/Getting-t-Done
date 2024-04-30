"use client";
import { Image, Skeleton } from "@nextui-org/react";
import NextImage from "next/image";
import { useEffect, useState } from "react";

export default function FormationCard({
  image,
  title,
  description,
  category,
}: {
  image: string;
  title: string;
  description: string;
  category: string;
}) {
  const [categoryName, setCategoryName] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`/api/category/${category}`, {
        cache: "no-cache",
      });
      const { name } = await response.json();
      setCategoryName(name);
      setLoaded(true);
    };

    fetchCategory();
  }, []);

  return (
    <div className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-100  text-start">
      <div className="space-y-3">
        <div className="flex items-center gap-x-3">
          <div className="bg-white w-14 h-14 border rounded-full flex items-center justify-center overflow-hidden">
            <Image
              fallbackSrc="/defaultImage.jpg"
              as={NextImage}
              sizes="100%"
              width={0}
              height={0}
              src={image || "/defaultImage.jpg"}
              alt={title}
              className="object-cover w-14 h-14 "
            />
          </div>
          <div>
            <span className="block text- text-primary-0 font-medium capitalize">
              {title}
            </span>
            {loaded ? (
              categoryName && (
                <h3 className="text-xs  font-semibold mt-1 bg-green-600/20 w-fit px-3 py-1 text-green-600 rounded-full">
                  {categoryName}
                </h3>
              )
            ) : (
              <Skeleton className="text-xs  font-semibold mt-1 px-3 py-1 rounded-full h-4 w-24" />
            )}
          </div>
        </div>
        <p className="text-gray-600 sm:text-sm line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
