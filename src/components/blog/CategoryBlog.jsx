import { getImageUrl } from '@/utils/mainDomain';
import Link from 'next/link';
import React from 'react'
import Container from '../container';

function CategoryBlog({ category, searchParams }) {

    const activeCategory = searchParams?.category;
    return (
        <>
            <Container>
                <div className="flex flex-wrap items-center pt-20">
                    {category.map((cat) => (
                        <div key={cat.id} className="p-4 lg:w-[14.286%] sm:w-1/4 w-1/2">
                            <Link
                                href={`?${(() => {
                                    const params = new URLSearchParams(searchParams);
                                    params.delete("category");
                                    if (activeCategory !== cat.id.toString()) {
                                        params.set("category", cat.id);
                                    }
                                    return params.toString();
                                })()}`}
                                className="flex flex-col justify-center items-center"
                                scroll={false}
                            >
                                <div
                                    className={`rounded-[50px] overflow-hidden cursor-pointer border-4 h-52 ${activeCategory === cat.id.toString()
                                        ? "border-teal-500 shadow-lg"
                                        : "border-transparent"
                                        }`}
                                >
                                    <img className="w-full h-full object-cover" src={getImageUrl(cat.image)} alt="" />
                                </div>
                                <p
                                    className={`cursor-pointer mt-4 text-lg font-semibold ${activeCategory === cat.id.toString() ? "text-teal-500" : ""
                                        }`}
                                >
                                    {cat.title}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    )
}

export default CategoryBlog