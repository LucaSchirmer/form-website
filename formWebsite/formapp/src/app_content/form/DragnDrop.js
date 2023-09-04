import React, { useState, useEffect } from 'react';

const DragNDrop = ({ name, maxAmount = 1, allowMultiple=false, className={} }) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [images, setImages] = useState([]);
    const [imgCount, setImgCount] = useState(0);

    useEffect(() => {
        setImgCount(images.length);
    }, [images]);

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDraggingOver(false);

        const droppedFiles = Array.from(event.dataTransfer.files);
        const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
        const imageUrls = imageFiles.map(file => URL.createObjectURL(file));


        
        let newImages = [...images, ...imageUrls];

        if (newImages.length > maxAmount) {
            const removeCount = newImages.length - maxAmount;
            newImages = newImages.slice(removeCount);
        }

        setImages(newImages);
    };

    const handlechangeAfterOnclick = (event) => {
        const fileInput = event.target;


        console.log(fileInput)
        if (fileInput.files && fileInput.files.length > 0) {
            const droppedFiles = Array.from(fileInput.files);
            const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
            const imageUrls = imageFiles.map(file => URL.createObjectURL(file));

            let newImages = [...images, ...imageUrls];

            if (newImages.length > maxAmount) {
                const removeCount = newImages.length - maxAmount;
                newImages = newImages.slice(removeCount);
            }

            setImages(newImages);
        }
    };


    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleDragOver = (event) => {
        event.preventDefault();

        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };

    const handleDropAreaClickForInput = () =>{
        document.querySelector(`.${className}INPUT`).click();
    }
       

    return (
        
        <div className={`${className} dragNdrop`}>
            <p className="dragNdropP"> 
                Choose a image {name}
                <br/>    
                <span className={(imgCount === maxAmount) ? "colorRed": ""}>
                    You have uploaded {imgCount} of the maximum amount of {maxAmount} 
                </span>
            </p>
            <div
                className={`dropArea${isDraggingOver ? ' draggingOver' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}

                // when clicked => clicks input 
                onClick={handleDropAreaClickForInput}
            >

            <label className="DragNdropLabel">
                Add an image by either dragging and dropping it here or clicking to select an image.
            </label>

            <input
                onChange={handlechangeAfterOnclick}
                type="file"
                className={`FileInputDragNDrop ${className}INPUT`}
                multiple={allowMultiple}
            />
            </div>
            <div className="imageList">
                {images.map((imageUrl, index) => (
                    <div className={`imageContainer ${className}`} >
                        <div className="removeIMG" onClick={() => handleRemoveImage(index)}>X</div>
                        <img className={className} src={imageUrl} alt={`${className}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DragNDrop;
