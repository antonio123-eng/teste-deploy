import React, { useEffect, useState } from 'react'

const Home = () => {

  const [photos, setPhotos] = useState([])

  useEffect(() => {
    
    const fetchPhoto = async() => {

      const res = await fetch("https://teste-deploy-toughts.herokuapp.com", {mode: "no-cors"})
      const data = await res.json()
      console.log(data)

      setPhotos(data)
      console.log(photos)
    }
    fetchPhoto()
  }, [])

  return (
    <div>
      {photos && photos.map((photo) => (
        <div>
          <h3>{photo.title}</h3>
          <img src={photo.image} alt={photo.title} />
        </div>
      ))}
    </div>
  )
}

export default Home