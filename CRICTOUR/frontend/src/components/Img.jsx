import { useState, useEffect } from 'react';

export default function Img() {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex(prevIndex => (prevIndex + 1) % 3);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container-fluid my-4">
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="0" className={slideIndex === 0 ? "active" : ""}
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="1" className={slideIndex === 1 ? "active" : ""}
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="2" className={slideIndex === 2 ? "active" : ""}
                        aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className={`carousel-item ${slideIndex === 0 ? "active" : ""}`}>
                        <img src="https://source.unsplash.com/800x250/?cricket" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div className={`carousel-item ${slideIndex === 1 ? "active" : ""}`}>
                        <img src="https://source.unsplash.com/800x250/?football" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div className={`carousel-item ${slideIndex === 2 ? "active" : ""}`}>
                        <img src="https://source.unsplash.com/800x250/?nature" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button"
                    data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                    data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
