import React, { useState, useEffect } from 'react';
import imgData from './../../utils/imgData';
import { FaImage } from 'react-icons/fa';

const Gallery = () => {
    const [uploadedImage, setUploadedImage] = useState(imgData);
    const [selectedItems, setSelectedItems] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const newImage = {
            id: uploadedImage.length + 1,
            img: URL.createObjectURL(file),
            alt: file.name,
            title: file.name
        };
        setUploadedImage([...uploadedImage, newImage]);
    };

    useEffect(() => {
    }, [uploadedImage]);

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

    const handleDragStart = (e, item) => {
        setDraggedItem(item);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, item) => {
        e.preventDefault();
        const updatedImages = [...uploadedImage];
        const draggedItemIndex = updatedImages.findIndex((img) => img.id === draggedItem.id);
        const dropItemIndex = updatedImages.findIndex((img) => img.id === item.id);
        [updatedImages[draggedItemIndex], updatedImages[dropItemIndex]] = [
            updatedImages[dropItemIndex],
            updatedImages[draggedItemIndex],
        ];
        setUploadedImage(updatedImages);
        setDraggedItem(null);
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
                                const updatedUploadedImage = uploadedImage.filter(item => !isChecked(item.id));
                                setUploadedImage(updatedUploadedImage);
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
                        {uploadedImage?.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`g-img ${isChecked(item.id) ? 'selected' : ''}`}
                                    onClick={() => toggleCheckbox(item.id)}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, item)}
                                    onDragOver={(e) => handleDragOver(e, item)}
                                    onDrop={(e) => handleDrop(e, item)}
                                >
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${index}`}
                                        className="g-checkbox"
                                        value={item.id}
                                        checked={isChecked(item.id)}
                                        onChange={() => toggleCheckbox(item.id)}
                                        style={{ display: isChecked(item.id) && 'block' }}
                                    />
                                    <img src={item.img} alt={item.alt} />
                                </div>
                            )
                        })}
                        <label
                            className="g-upload-container"
                            htmlFor="imageUpload"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="g-upload">
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                                <FaImage className='g-up-icon' />
                            </div>
                            <p className='g-add-img'>Add Images</p>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;