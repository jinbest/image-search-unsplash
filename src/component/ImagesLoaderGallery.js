import React, { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import PinedImage from "./PinedImage";
import Button from '@material-ui/core/Button';

const ImagesLoaderGallery = ({data, handlePinData, handleUnPinData}) => {
  const [photos, setPhotos] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const selectItem = (index, checked) => {
    let cntPhotos = photos, newPhotos = [];
    cntPhotos[index].pinstatus = checked ? 'true' : 'false';
    for (let i = 0; i < cntPhotos.length; i++) {
      if (cntPhotos[i].pinstatus === 'true') {
        newPhotos.push(cntPhotos[i]);
      }
    }
    handlePinData(newPhotos);
    newPhotos = [];
    for (let i = 0; i < cntPhotos.length; i++) {
      if (cntPhotos[i].pinstatus === 'false') {
        newPhotos.push(cntPhotos[i]);
      }
    }
    handleUnPinData(newPhotos);
  }

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    let cntPhotos = [];
    for (let i = 0; i < data.pin.length; i++) {
      cntPhotos.push(data.pin[i])
    }
    for (let i = 0; i < data.unpin.length; i++) {
      cntPhotos.push(data.unpin[i])
    }
    if (cntPhotos.length) {
      setPhotos(cntPhotos);
    }
  }, [data]);

  useEffect(() => {
    const cntPhotos = photos;
    if (cntPhotos.length) {
      for (let i = 0; i < cntPhotos.length; i++) {
        cntPhotos[i].pinstatus = selectAll ? 'true' : 'false';
      }
      setPhotos(cntPhotos);
      if (selectAll) {
        handlePinData(cntPhotos);
        handleUnPinData([]);
      } else {
        handlePinData([]);
        handleUnPinData(cntPhotos);
      }
    }
  }, [selectAll]);

  const imageRenderer = ({ index, left, top, key, photo }) => (
    <PinedImage
      selected={selectAll ? true : false}
      key={key}
      margin={"2px"}
      index={index}
      photo={photo}
      left={left}
      top={top}
      selectItem={selectItem}
    />
  );

  return (
    <div>
      {photos.length ? <Button variant="contained" color="primary" onClick={toggleSelectAll} style={{margin: '20px'}}>
        {selectAll ? 'Unpin All' : 'Pin All'}
      </Button> : undefined}
      <Gallery photos={photos} renderImage={imageRenderer} />
    </div>
  );
}

export default ImagesLoaderGallery
