import React from "react";
import Img from "../components/Img";
import Rank from "../components/Rank";
import Highlights from '../components/Highlights';

export default function Home() {
    return (
        <div>
            <Img></Img>
            <Rank></Rank>
            <div>
                <Highlights></Highlights>
            </div>
        </div>
    );
}
