import React from 'react';
import Header from '../components/Nav/Header';
import Img from './Img';
import { Outlet } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <Img></Img>
        </div>
    );
}
