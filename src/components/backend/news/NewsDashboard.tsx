import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as service from "../../../services";
import NewsType from '@/src/services/news/NewsType';

const NewsDashboard = () => {

    const [listNews, setlistNews] = useState<NewsType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getAllNews= await service.getAllNews();
                setlistNews(getAllNews);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchData();
    }, []);

    const changePublishNews = async (newId: string, status: boolean) => {
        await service.updateNewsStatus(newId, !status);
        const getAllNews= await service.getAllNews();
        setlistNews(getAllNews);  
    }

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                List News
            </h4>
            <Link className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                to="/backend/news/addnews"
            >
                Add News
            </Link>

            <div className="flex flex-col">
                <div className="grid grid-cols-1 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
                    <div className="p-2.5 sm:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            No.
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Title
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Category
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Tag
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Author
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Updated At
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Action
                        </h5>
                    </div>
                </div>

                {listNews.map((news: NewsType, index) => (
                    <div
                        key={index + 1}
                        className={`grid grid-cols-3 sm:grid-cols-7`}
                    >
                        <div className="flex items-center gap-1 p-2.5 sm:p-5">
                            <p className="hidden text-black dark:text-white sm:block">
                                { index + 1 }
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{news?.title}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white">{news?.category}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white">{news?.tag}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">{news?.author}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">{news?.updatedAt}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <button
                                onClick={() => changePublishNews(news?.id??'', news.published)}
                                className={`w-12 h-6 p-0 m-auto rounded-full flex transition duration-500 shadow-2xl 
                                            ${news.published ? 'focus:ring-2 focus:ring-green-800 justify-end bg-green-500' : 'focus:ring-2 focus:ring-red-800 justify-start bg-red-500'}`}
                                title={news.published ? 'InActive' : 'Active'}            
                                >
                                <span
                                    className={`bg-gray-300 transition duration-500 rounded-full w-1/2 h-full m-0 p-0 shadow-xl`}
                                ></span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsDashboard;