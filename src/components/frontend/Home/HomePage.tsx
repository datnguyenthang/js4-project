import React, { useContext, useEffect, useState } from 'react';
import * as service from "../../../services";
import { Link, useLocation } from 'react-router-dom';
import NewsType from '@/src/services/news/NewsType';
import { LoaderContext } from '../../hooks/LoaderContext';

const HomePage = () => {

    const loadingContext = useContext(LoaderContext);

    const [listNews, setListNew] = useState<NewsType[]>([]);
    const [listTag, setListTag] = useState<string[]>([]);
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tag: string | null = queryParams.get('tag'); //get tag from url
    const category: string | null = queryParams.get('category'); //get category from url

    useEffect(() => {
        loadingContext.setIsLoader(true);

        const fetchNews = async () => {
            try {
                const listNews = await service.getPublishedNewsSortedByUpdatedAt();
                let filteredNews = listNews;
                if (tag) {
                    filteredNews = listNews.filter(newsItem => newsItem.tag?.includes(tag));
                }
                if (category) {
                    filteredNews = listNews.filter(newsItem => newsItem.category?.includes(category));
                }

                setListNew(filteredNews);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                loadingContext.setIsLoader(false);
            }
        };

        const fetchTags = async () => {
            try {
                const listTag = await service.scanTags();
                setListTag(listTag);
            } catch (error) {
                console.error("Error fetching tag:", error);
            } finally {
                loadingContext.setIsLoader(false);
            }
        };

        fetchNews();

        fetchTags();

        
    }, [tag, category]);

    return (
        <div className="home-page block mt-10">
            <div className="banner bg-green-500 py-10 items-center justify-center">
                <div className="container mx-auto text-center">
                    <h1 className="text-3xl font-semibold text-white">Instant News</h1>
                    <p className="text-lg text-white">Bringing Breaking News to everyone</p>
                </div>
            </div>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <div className="feed-toggle p-6">
                            <ul className="pb-0 space-y-2 border-b-2 border-slate-200 dark:border-slate-800">
                                <li className="">
                                    <div className="border-b-2 border-green-500 dark:border-green-500 font-semibold">Lastest News</div>
                                </li>
                            </ul>
                        </div>
                        {listNews.map((news: NewsType, index) => (
                            <Link to={`/news/${news.id}`} key={index}>
                                <div className="article-preview p-6 border-b border-gray-200">
                                    <div className="article-meta flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div><img src="https://robohash.org/feae511b51e1c1b73ebcea3720502ee0?set=set4&bgset=&size=35x35" alt="author's profile image" className="lazyautosizes ls-is-cached lazyloaded" sizes="32px" /></div>
                                            <div className="ml-2 text-green-300 font-semibold"><span>{news.author}</span></div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="date text-gray-400 font-semibold">{news.updatedAt}</span>
                                        </div>
                                    </div>
                                    <div className="preview-link">
                                        <h1 className="font-semibold text-lg mt-2">{news.title}</h1>
                                        <p className="text-slate-500 mt-2">{news.shortContent}</p>
                                        <span className="text-sm border-b-2 mb-2 font-semibold">Read more...</span>
                                        <ul className="right-0 mt-3">
                                            {  news?.tag?.map((tag, index) => (
                                                <li key={index} className="text-gray bg-slate-300 rounded-xl border-1 text-xs py-1 px-2 whitespace-no-wrap mr-1 mb-2 inline-block">{tag}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="col-span-1">
                        <div className="sidebar p-6">
                            <p className="space-y-2 border-b-2 border-green-200 dark:border-green-200 font-semibold">#Tags</p>
                            <div className="mt-2">
                                {  listTag.map((tag, index) => (
                                    <Link to={`/?tag=${tag}`} key={index} className="text-gray bg-slate-300 rounded-xl border-1 text-xs py-1 px-2 whitespace-no-wrap mr-1 mb-2 inline-block"><span>{ tag }</span></Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
