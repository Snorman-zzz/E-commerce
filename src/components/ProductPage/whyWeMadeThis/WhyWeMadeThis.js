import React, { useEffect, useState } from 'react';
import './WhyWeMadeThis.scss';

const WhyWeMadeThis = () => {
    const [text, setText] = useState('');
    const [image0, setImage0] = useState('');
    const [image2, setImage2] = useState('');

    useEffect(() => {
        fetch(`http://api-lulu.hibitbyte.com/product/prod10550089?mykey=g8TU78EbYNFjmlj9%2BXdgqwPpV9bftaLIA4%2Bs3%2B26rHNhEOf4j3ha0kW80xReJP8r47tbjYjRs5cqonQD8HK4CA==`)
            .then(response => response.json())
            .then(data => {
                setText(data.rs.whyWeMadeThis);
                const images = data.rs.images[0].mainCarousel.media.split(' | ');
                setImage0(images.find(image => image.endsWith('_img0.jpg')));
                setImage2(images.find(image => image.endsWith('_img2.jpg')));
            })
            .catch(error => console.error('An error occurred:', error));
    }, []);

    return (
        <div className="whyWeMadeThis">
            <div className="text-content">
                <h2 className="why-we-made-this_heading">Why we<br/>made this
                </h2>
                <p className="why-we-made-this_text">{text}</p>
            </div>
            <div className="images">
                <img src={image0} alt="Image 0" />
                <img src={image2} alt="Image 2" />
            </div>
        </div>
    );
};

export default WhyWeMadeThis;
