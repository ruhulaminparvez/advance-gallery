import { useState, useRef } from 'react';
import imgData from './../../utils/imgData';
import { FaImage } from 'react-icons/fa';

const Gallery = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const inputRef = useRef();

    console.log(uploadedImage);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setUploadedImage(file);
    };
    const handleContainerClick = () => {
        inputRef.current.click();
    };

    return (
        <div className="g-container">
            <div className="g-upper">
                <div className="g-title">
                    <h2>Gallery</h2>
                </div>
                <hr className="g-line" />
            </div>
            <div className="g-lower">
                <div className="g-item">
                    <div className="g-gallery">
                        {imgData?.map((item, index) => {
                            return (
                                <div key={index} className='g-img'>
                                    <img src={item.img} alt={item.alt} />
                                </div>
                            )
                        })}
                        <div className="g-upload-container" onClick={handleContainerClick}>
                            <div className="g-upload">
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                    ref={inputRef}
                                />
                                <label htmlFor="imageUpload">
                                    <FaImage className='g-up-icon' />
                                </label>
                            </div>
                            <p className='g-add-img'>Add Images</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;