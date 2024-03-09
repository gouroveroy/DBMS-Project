import React from "react";
import Img from "../components/Img";
import Highlights from '../components/Highlights';
import News from '../components/News';

export default function Home() {
    return (
        <div>
            <Img></Img>
            <div>
                <News></News>
            </div>
            <div>
                <Highlights></Highlights>
            </div>
        </div>
    );
}
