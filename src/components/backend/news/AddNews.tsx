import React, { useContext, useEffect, useState } from 'react';
import * as service from "../../../services";
import { useNavigate } from 'react-router-dom';
import NewsType from '@/src/services/news/NewsType';
import { TagsInput } from 'react-tag-input-component';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import FirebaseAdapter from './FirebaseAdapter';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserSessionContext } from '../../context/UserContext';
import CategoryType from '@/src/services/categories/CategoryType';
import { LoaderContext } from '../../context/LoaderContext';
//import { Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar } from '@ckeditor/ckeditor5-image';

const AddNews = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState<string[]>([]);
    const [shortContent, setShortContent] = useState('');
    const [content, setContent] = useState('');
    const [listCategory, setListCategory] = useState<CategoryType[]>([]);

    const loadingContext = useContext(LoaderContext);

    //get name of user session
    const userContext = useContext(UserSessionContext);
    const user = userContext.userSession;

    const [news, setNews] = useState<NewsType>({
        title: '',
        shortContent: shortContent,
        content: content,
        author: user.name,
        category: '',
        tag: tags,
        published: true,
    });

    useEffect(() => {
        loadingContext.setIsLoader(true);
        const fetchData = async () => {
            try {
                const getAllCategories= await service.getAllCategories();
                setListCategory(getAllCategories);
            } catch (error) {
                console.error("Error fetching category:", error);
            } finally {
                loadingContext.setIsLoader(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNews(prevNews => ({
            ...prevNews,
            [name]: value,
            shortContent: shortContent,
            content: content,
        }));
    };

    const handleTagsChange = (newTags: string[]) => {
        setTags(newTags);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedNews = {
            ...news,
            shortContent: shortContent,
            content: content,
            tag: tags,
        };

        service.addNews(updatedNews)
        .then(result => {
            if(result) navigate('/backend/news');
        })
        .catch(e => {
            console.log("Error", e)
        });
    };

    //CKEDITOR handling functions
    const handleInit = (editor: any) => {
        editor.editing.view.change((writer: any) => {
            writer.setStyle(
                "min-height",
                "300px",
                editor.editing.view.document.getRoot()
            );
        });
        editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
            return new FirebaseAdapter(loader);
        };
    };

    const handleChangeEditor = async (event: any, editor: any) => {
        const data = editor.getData();
        await setContent(data);
        //console.log(data);
    };

    const handleBlur = (event: any, editor: any) => {
        //console.log('Blur.', editor);
    };

    const handleFocus = (event: any, editor: any) => {
        //console.log('Focus.', editor);
    };
    /////////////////////////////

    return (
        <div className="max-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add News</h2>
            <form onSubmit={handleSubmit} className="space-y-5 mb-20">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input type="text" id="title" name="title" value={news.title} required onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div>
                    <label htmlFor="shortContent" className="block text-sm font-medium text-gray-700">Short Content:</label>
                    <textarea 
                        id="shortContent" 
                        name="shortContent" 
                        value={shortContent} 
                        required 
                        onChange={e => setShortContent(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            //plugins: [ Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize ],
                            image: {
                                toolbar: [
                                    'toggleImageCaption',
                                    'imageTextAlternative',
                                    'ckboxImageEdit'
                                ]
                            }
                        }}
                        data={content}
                        onReady={handleInit}
                        onChange={handleChangeEditor}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />
                </div>
                <div>
                    <label htmlFor="category">Select Category:</label>
                    <select 
                        id="category" 
                        name="category" 
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                        onChange={handleChange}
                        >
                        <option value="">-------</option>
                        {listCategory.map(category => (
                            <option key={category.id} value={category.name}>{category.name} - {category.active ? "active" : "inactive"}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Tag:</label>
                    <TagsInput
                        value={news.tag}
                        onChange={handleTagsChange}
                        name="tag"
                        placeHolder="enter to add category tag"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Add News</button>
            </form>
        </div>

    );
};

export default AddNews;
