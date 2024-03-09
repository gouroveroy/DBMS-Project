import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player'

import './../assets/CSS/footer.css';
import './../assets/CSS/highlights.css';
function Highlights() {
    const [highlights, setHighlights] = useState([]);
    const highlightContainerRef = useRef(null);

    // const scrollToRight = () => {
    //     if (highlightContainerRef.current) {
    //         highlightContainerRef.current.scrollLeft += 200; // Adjust scroll distance as needed
    //     }
    // };

    // const scrollToLeft = () => {
    //     if (highlightContainerRef.current) {
    //         highlightContainerRef.current.scrollLeft -= 200; // Adjust scroll distance as needed
    //     }
    // }
    useEffect(() => {
        // Fetch cricket highlight videos from backend API
        fetch('http://localhost:8000/highlights')
            .then(response => response.json())
            .then(data => {
                setHighlights(data);
            })
            .catch(error => {
                console.error('Error fetching highlights:', error);
            });
    }, []);

    return (
        <div style={{marginTop: '100px'}}>
            <h2>Latest Highlights</h2>
            {/* <button onClick={scrollToLeft} className="scroll-left-button">&#60;</button> */}
            <div className="highlight-container" ref={highlightContainerRef}>
                {highlights.map(highlight => (
                    <div key={highlight.match_id} className="highlight-item">
                        <ReactPlayer url={highlight.video_url} />
                    </div>
                ))}
            </div>
            {/* <button onClick={scrollToRight} className="scroll-right-button">&#62;</button> */}
        </div>
    )
}

export default Highlights;
