import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import * as service from "../../../../services";
import CategoryType from '@/src/services/categories/CategoryType';

const Header = () => {
    //const navigate = useNavigate();
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
                    <Link className="text-xl font-semibold text-gray-800" to="/">
                        <span className='text-green-800 text-2xl'>Instant News</span>
                    </Link>
                    <ul className="flex items-center space-x-4">
                        <Link to="/backend" className="text-green-600 hover:text-green-600 font-bold text-xl">
                                <span>Sign in</span>
                        </Link>
                        {listCategory.map((category: CategoryType, index) => (
                            <Link key={index} to={`/?category=${category.name}`} className="text-green-500 hover:text-green-600 font-bold text-xl">
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
