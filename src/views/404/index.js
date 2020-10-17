import React from 'react';
import './404.scss';
export default class C404 extends React.Component
{
    constructor(props)
    {
        super(props);
        document.body.style.overflow = 'hidden';
    }
    componentWillUnmount()
    {
        document.body.style.overflow = "";
    }
    render(){
        return(
            <div className="not-found parallax">
                <div className="sky-bg"></div>
                <div className="wave-7"></div>
                <div className="wave-6"></div>
                <a className="wave-island" href="#">
                        <img src="http://res.cloudinary.com/andrewhani/image/upload/v1524501929/404/island.svg" alt="Island"/>
                    </a>
                <div className="wave-5"></div>
                <div className="wave-lost wrp">
                    <span>4</span>
                    <span>0</span>
                    <span>4</span>
                </div>
                <div className="wave-4"></div>
                <div className="wave-3"></div>
                <div className="wave-2"></div>
                <div className="wave-1"></div>
            </div>
        );
    }
}