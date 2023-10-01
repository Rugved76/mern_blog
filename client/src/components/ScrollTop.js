import React, { useState, useEffect } from 'react';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import '../index';

const StickyScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button className={`sticky-scroll-to-top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop} style={{borderRadius:'50%'}}>
            <ArrowUpwardRoundedIcon color='primary'/>
        </button>
    );
};

export default StickyScrollToTopButton;
