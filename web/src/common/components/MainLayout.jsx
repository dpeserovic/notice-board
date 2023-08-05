import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { defaultTemplate } from 'common/hoc';
import { RBNavbar } from './';

function MainLayout({ children, globalLoaderStore: { isLoading } }) {
    return (
        <>
            <RBNavbar />
            {isLoading ?
                <div className="text-center">
                    <RotatingLines strokeColor="red" strokeWidth="2.5" animationDuration="1" width="90" visible={true} />
                </div>
                :
                children
            }
        </>
    );
}

export default defaultTemplate(MainLayout);
