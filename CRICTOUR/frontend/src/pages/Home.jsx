import React from "react";
import Img from "../components/Img";
import Rank from "../components/Rank";
import Highlights from '../components/Highlights';
import News from '../components/News';

export default function Home() {
    return (
        <div>
            <Img></Img>
            <Rank></Rank>
            <div>
                <News></News>
            </div>
            <div>
                <Highlights></Highlights>
            </div>
        </div>
    );
}
