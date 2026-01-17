"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

interface Category {
    id: string;
    name: string;
    slug: string;
    image: string | null;
}

export default function CategoryScroll({ categories }: { categories: Category[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft =
                scrollContainerRef.current.scrollLeft +
                (direction === "left" ? -scrollAmount : scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            });
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    return (
        <div className="relative">
            {/* Left Scroll Button */}
            {showLeftButton && (
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
            )}

            {/* Right Scroll Button */}
            {showRightButton && (
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
            )}

            {/* Scrollable Container */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-8"
            >
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="group flex-shrink-0 snap-start"
                    >
                        <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition text-center border border-gray-100 w-32 h-36 flex flex-col items-center justify-center">
                            {category.image && (
                                <div className="relative w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition"
                                    />
                                </div>
                            )}
                            <h3 className="font-semibold text-sm text-gray-900 group-hover:text-purple-600 transition line-clamp-2 leading-tight">
                                {category.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
