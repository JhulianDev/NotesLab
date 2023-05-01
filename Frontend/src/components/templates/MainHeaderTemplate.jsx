import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from '../organisms/MainHeader';

const MainHeaderTemplate = () => {
    return (
        <div>
            <MainHeader/>
            <Outlet/>
        </div>
    );
};

export default MainHeaderTemplate;