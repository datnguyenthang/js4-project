import React, { useState } from 'react';
import * as service from "../../../services";
import { useNavigate } from 'react-router-dom';
import CategoryType from '@/src/services/categories/CategoryType';
import { TagsInput } from 'react-tag-input-component';

const AddCategory = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState<string[]>([]);

    const [category, setCategory] = useState<CategoryType>({
        name: '',
        descryption: '',
        tag: [],
        active: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setCategory(prevCategory => ({
            ...prevCategory,
            [name]: value,
            tag: tags,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setCategory(prevCategory => ({
            ...prevCategory,
            tag: tags
        }));

        service.addCategory(category)
        .then(result => {
            if(result) navigate('/backend/category');
        })
        .catch(e => {
            console.log("Error", e)
        });

    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input type="text" id="name" name="name" value={category.name} required onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label htmlFor="descryption" className="block text-sm font-medium text-gray-700">Descryption:</label>
                    <input type="text" id="descryption" name="descryption" value={category.descryption} required onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Tag:</label>
                    <TagsInput
                        value={category.tag}
                        onChange={
                            async(tags: string[]) => {
                                setTags(tags);
                            }
                        }
                    
                        name="tag"
                        placeHolder="enter to add category tag"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Add Category</button>
            </form>
        </div>

    );
};

export default AddCategory;
