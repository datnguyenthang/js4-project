import React, { useContext, useEffect, useState } from 'react';
import * as service from "../../../services";
import { useNavigate, useParams } from 'react-router-dom';
import NewsType from '@/src/services/news/NewsType';
import { LoaderContext } from '../../context/LoaderContext';

const News = () => {
    const navigate = useNavigate();
    const loadingContext = useContext(LoaderContext);

    const { newId } = useParams<{ newId: string }>();
    const [news, setNews] = useState<NewsType | null>(null);

    useEffect(() => {
        loadingContext.setIsLoader(true);

        if (!newId) {
            navigate('/');
            return;
        }

        const fetchNews = async () => {
            try {
                const newsData = await service.getNewsById(newId);
                if (!newsData || !newsData.published) {
                    navigate('/');
                    return;
                }
                setNews(newsData);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                loadingContext.setIsLoader(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="home-page block mt-10 p-6">
            <div className="container mx-auto">
                <div className="banner bg-black-500 items-center justify-center">
                    <div className="container mx-auto text-center">
                        <h1 className="text-3xl font-semibold text-green-300">{news?.title}</h1>
                    </div>
                    <div className="article-meta flex items-center justify-between">
                        <div className="flex items-center p-6">
                            <div>
                                <img src="https://api.realworld.io/images/demo-avatar.png" alt="author's profile image" className="lazyautosizes ls-is-cached lazyloaded" sizes="32px" />
                            </div>
                            <div className="ml-2 text-green-300 font-semibold">
                                <span>{news?.author}</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="date text-gray-500 font-semibold">{news?.updatedAt}</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div className="col-span-2">
                        <div className="article-preview p-6">
                        <div className="text-slate-500 mt-1" dangerouslySetInnerHTML={{ __html: news?.content as string }}></div>

                            <ul className="right-0 mt-2">
                                {  news?.tag?.map((tag, index) => (
                                    <li key={index} className="text-gray bg-slate-300 rounded-xl border-1 text-xs py-1 px-2 whitespace-no-wrap mr-1 mb-2 inline-block">{tag}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
