import React, { useEffect, useState } from 'react';
import * as service from "../../../../services";
import { Link, useNavigate } from 'react-router-dom';
import NewsType from '@/src/services/news/NewsType';

const HomePage = () => {

    const navigate = useNavigate();
    const [listNews, setListNew] = useState<NewsType[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const listNews = await service.getPublishedNewsSortedByUpdatedAt();
                setListNew(listNews);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

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
                                <div className="article-preview p-6">
                                    <div className="article-meta flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div><img src="https://api.realworld.io/images/demo-avatar.png" alt="author's profile image" className="lazyautosizes ls-is-cached lazyloaded" sizes="32px" /></div>
                                            <div className="ml-2 text-green-200 font-semibold"><span>Author</span></div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="date font-semibold">{news.updatedAt}</span>
                                        </div>
                                    </div>
                                    <div className="preview-link">
                                        <h1 className="font-semibold text-lg mt-1">{news.title}</h1>
                                        <p className="text-slate-500 mt-1">{news.shortContent}</p>
                                        <span className="text-sm border-b-2 mb-2 font-semibold">Read more...</span>
                                        <ul className="right-0 mt-2">
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
                                <a href="/?tag=eos" className="text-gray bg-slate-300 rounded-xl border-1 text-xs py-1 px-2 whitespace-no-wrap mr-1 mb-2 inline-block"><span>tag1</span></a>
                                <a href="/?tag=est" className="text-gray bg-slate-300 rounded-xl border-1 text-xs py-1 px-2 whitespace-no-wrap mr-1 mb-2 inline-block"><span>tag2</span></a>
                                <a href="/?tag=enim" className="text-gray bg-slate-300 rounded-xl border-1 text-xs py-1 px-2 whitespace-no-wrap mr-1 mb-2 inline-block"><span>tag3</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
