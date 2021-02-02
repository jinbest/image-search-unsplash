import React, {useState, useEffect, useCallback} from 'react'
import './App.css';
import SearchComponent from './component/SearchComponent'
import ImagesLoaderGallery from './component/ImagesLoaderGallery'
import {imageLoadAPI} from './service'

function App() {
  const [searchKey, setSearchKey] = useState('');
  const [pinData, setPinData] = useState([]);
  const [unPinData, setUnPinData] = useState([]);

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  }

  const onKeyPress = useCallback((event) => {
    if(event.key === 'Enter') {
      handleClickSearchIcon(event.target.value);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, []);

  const handleClickSearchIcon = (text) => {
    imageLoadAPI
      .getLoadImages(text)
      .then((res) => {
        console.log("api-imageLoadAPI:", res.data.results)
        const cntUnPined = [];
        for (let i = 0; i < res.data.results.length; i++) {
          cntUnPined.push({
            src: res.data.results[i].urls.full,
            width: res.data.results[i].width,
            height: res.data.results[i].height,
            pinstatus: 'false'
          })
        }
        setUnPinData(cntUnPined);
      })
      .catch((error) => {
        console.log("Error in image Load", error)
      })
  }

  return (
    <div className="App">
      <SearchComponent 
        color='rgba(0,0,0,0.8)' 
        bgcolor='white' 
        border='rgba(0,0,0,0.2)' 
        handleChange={handleChangeSearch} 
        handleIconClick={()=>handleClickSearchIcon(searchKey)}
        value={searchKey}
        height='40px'
      />
      <ImagesLoaderGallery data={{pin: pinData, unpin: unPinData}} handlePinData={setPinData} handleUnPinData={setUnPinData} />
    </div>
  );
}

export default App;
