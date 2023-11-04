import React, { useState, useRef } from 'react';
import imgData from './../../utils/imgData';
import { FaImage } from 'react-icons/fa';

const Gallery = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const inputRef = useRef();

    console.log(uploadedImage);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setUploadedImage(file);
    };
    const handleContainerClick = () => {
        inputRef.current.click();
    };

    const toggleCheckbox = (item) => {
        const selectedIndex = selectedItems.indexOf(item);
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            const updatedSelectedItems = [...selectedItems];
            updatedSelectedItems.splice(selectedIndex, 1);
            setSelectedItems(updatedSelectedItems);
        }
    };

    const isChecked = (item) => {
        return selectedItems.indexOf(item) !== -1;
    };

    return (
        <div className="g-container">
            <div className="g-upper">
                <div className="g-title">
                    {selectedItems?.length === 0 ?
                        <h2>Gallery</h2>
                        :
                        <React.Fragment>
                            <h2>{selectedItems?.length} Selected</h2>
                            <button className='g-dtl-btn' onClick={() => {
                                setSelectedItems([]);
                            }}>
                                {selectedItems?.length === 1 ? 'Delete File' : 'Delete Files'}
                            </button>
                        </React.Fragment>
                    }
                </div>
                <hr className="g-line" />
            </div>
            <div className="g-lower">
                <div className="g-item">
                    <div className="g-gallery">
                        {imgData?.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`g-img ${isChecked(item.id) ? 'selected' : ''}`}
                                    onClick={() => toggleCheckbox(item.id)}
                                >
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${index}`}
                                        className="g-checkbox"
                                        value={item.id}
                                        checked={isChecked(item.id)}
                                        style={{ display: isChecked(item.id) && 'block' }}
                                    />
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