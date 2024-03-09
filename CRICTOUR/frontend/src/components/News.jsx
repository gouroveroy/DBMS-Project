import React, { useState, useEffect } from 'react';

import '../assets/CSS/news.css';

function News() {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/news')
            .then(response => response.json())
            .then(data => {
                console.log("Data received:", data);
                setNewsData(data);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
            });
    }, []);

    console.log("newsData:", newsData); // Add this line

    return (
        <div style={{marginTop: '50px'}}>
            <h2>Latest News</h2>
            {newsData.length > 0 && (
                <div className='news-container'>
                    {newsData.map(news => (
                        <div key={news.match_id} className="news-item" style={{height: '50vh'}}>
                            <iframe src={news.news_url} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default News;
