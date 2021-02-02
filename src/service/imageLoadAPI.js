import axios from 'axios'

class AppLoadAPI {

  getLoadImages = (keyword) => {
    const clientId = "e8a730dd88a1ca594c2f2c3c10d2d5de2b91ea6e29cc7a64bd6c09b60921086a";
    const apiURL = `https://api.unsplash.com/search/photos?query=${keyword}&client_id=${clientId}`
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiURL}`)
        .then((response) => {
          if (response) {
            resolve(response)
          } else {
            reject(response)
          }
        })
        .catch((error) => {
          if (error) {
            console.log("error response in get store details: ", error)
          }
        })
    })
  }

}

const instance = new AppLoadAPI()

export default instance
