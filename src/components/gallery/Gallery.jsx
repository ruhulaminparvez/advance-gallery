import imgData from './../../utils/imgData';
import { FaImage } from 'react-icons/fa';

const Gallery = () => {
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
                        <div className="g-upload-container">
                            <div className="g-upload">
                                <FaImage className='g-up-icon' />
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