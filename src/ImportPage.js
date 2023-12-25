import React, { useState, useRef } from 'react';
import './App.css';

const ImportPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedText, setGeneratedText] = useState('');
  const [showReadButton, setShowReadButton] = useState(false);
  const inputFileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      generateTextFromImage(imageUrl);
      setShowReadButton(true); // Prikazivanje dugmeta kada korisnik odabere sliku
    }
  };

  const generateTextFromImage = async (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const { data } = imageData;

      const redValues = [];

      // Helper funkcija za konvertovanje bajta u RGB vrednost
      const byteToRGB = (value) => Math.round(value * 255);

      const pixelInterval = 3600; // Postavite interval za umetanje tajne poruke
      let endOfMessage = false;

      for (let i = 0; i < data.length; i += 4) {
        if (!endOfMessage && (i / 4) % pixelInterval === 0) {
          const redValue = byteToRGB(data[i] / 255);

          if (redValue === 33) {
            // Znak "!" predstavlja kraj poruke
            endOfMessage = true;
          } else {
            redValues.push(redValue);
          }
        }
      }

      // Konvertujemo crvene vrednosti u bajtove
      const byteArray = new Uint8Array(redValues);

      // Dekodiramo bajtove u tekstualni format
      const textRepresentation = new TextDecoder().decode(byteArray);

      setGeneratedText(textRepresentation);
    };
  };

  const handleReadMessage = () => {
    alert(generatedText); // Prikazivanje tajne poruke u alert prozoru
  };

  const handleChooseFile = () => {
    inputFileRef.current.click();
  };

  return (
    <div>
      <h1>Pročitajte tajnu poruku</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputFileRef}
        style={{ display: 'none' }}
      />
      <button className="yellow-button" onClick={handleChooseFile}>
        Odaberite sliku
      </button>
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Izabrana slika" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {showReadButton && (
        <button className="red-button" onClick={handleReadMessage}>
          Pročitaj tajnu poruku
        </button>
      )}
    </div>
  );
};

export default ImportPage;
