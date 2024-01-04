import React, { useState } from 'react';
import './App.css';

const ExportPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textMessage, setTextMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleTextChange = (e) => {
    setTextMessage(e.target.value);
  };

  const handleExport = () => {
    if (!selectedImage) {
      alert('Odaberite sliku pre nego što izvezete poruku.');
      return;
    }

    const img = new Image();
    img.src = selectedImage;

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const { data } = imageData;

      // Umetnite tajnu poruku u crvenu komponentu svaki 3600. piksel
      const textBytes = new TextEncoder().encode(textMessage);
      let byteIndex = 0;

      for (let i = 0; i < data.length; i += 4) {
        if ((i / 4) % 3600 === 0 && byteIndex < textBytes.length) {
          // Očuvanje postojeće vrednosti za G i B komponente
          const greenComponent = data[i + 1];
          const blueComponent = data[i + 2];

          // Postavljanje nove vrednosti za crvenu komponentu (R)
          data[i] = textBytes[byteIndex];

          // Vracanje postojeće vrednosti za G i B komponente
          data[i + 1] = greenComponent;
          data[i + 2] = blueComponent;

          byteIndex++;
        }
      }

      // Postavljanje umetnute slike
      ctx.putImageData(imageData, 0, 0);

      // Preuzimanje rezultujuće slike
      const generatedImageUrl = canvas.toDataURL('image/png');

      // Kreiranje linka za preuzimanje slike
      const link = document.createElement('a');
      link.href = generatedImageUrl;
      link.download = 'poruka_sa_slikom.png';
      link.click();
    };
  };

  return (
    <div>
      <h2>Umetnite tajnu poruku u sliku</h2>
      <div>
        <button className="yellow-button" onClick={() => document.getElementById('imageInput').click()}>
          Odaberite sliku<br/>*PDF*
        </button>
        <h4>*Znak ! unesite na kraju poruke</h4>
        <input
          type="file"
          accept="image/*"
          id="imageInput"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Izvezena slika" style={{ maxWidth: '100%' }} />
        </div>
      )}
      <div>
        <textarea
          rows="4"
          cols="50"
          value={textMessage}
          onChange={handleTextChange}
          placeholder="Unesite tajnu poruku..."
        />
      </div>
      <div>
        <button className="red-button" onClick={handleExport}>
          Izvezi sliku sa skrivenom porukom
        </button>
      </div>
    </div>
  );
};

export default ExportPage;
