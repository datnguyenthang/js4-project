import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as service from "../../../../services";
import CategoryType from '@/src/services/categories/CategoryType';

const Header = () => {
    const navigate = useNavigate();
    const [listCategory, setListCategory] = useState<CategoryType[]>([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categories = await service.getPublishedCategories();
                setListCategory(categories);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchCategory();
    }, []);

    return (
        <div>
            <nav className="bg-white shadow fixed w-full top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <a className="text-xl font-semibold text-gray-800" href="/">
                        <span className='text-green-800 text-2xl'>Instant News</span>
                    </a>
                    <ul className="flex items-center space-x-4">
                        {listCategory.map((category: CategoryType, index) => (
                            <Link key={index} to={`/${category.name}`} className="text-gray-500 hover:text-gray-600 font-bold text-xl">
                                <span>{category.name}</span>
                            </Link>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
