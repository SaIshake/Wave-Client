import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles




const Admin = () => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [colorInput, setColorInput] = useState(''); // State for color text input
    const [price, setPrice] = useState("");
    const [price2, setPrice2] = useState("");
    const [inStock, setInStock] = useState(true);
    const [bestSeller, setBestSeller] = useState(false);
    const [isNew, setIsNew] = useState(true);


    const modules = {
      toolbar: {
          container: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['link'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'align': [] }],
              ['clean']
          ],
      },
  };

  const formats = [
      'header', 'bold', 'italic', 'underline', 'list', 'bullet', 'align', 'link' // Add size to formats
  ];


    const addColor = () => {
      if (colorInput.trim() !== '') {
          setColors([...colors, colorInput]);
          setColorInput(''); // Clear the color input after adding
      }
  };



    const handleCheckboxChange = (value, stateSetter) => {
        stateSetter((prev) => {
          if (prev.includes(value)) {
            return prev.filter((item) => item !== value);
          } else {
            return [...prev, value];
          }
        });
      };
  
    const handleImageChange = (e, setImage) => {
      setImage(e.target.files[0]);
    };
  
    const handleMultipleImagesChange = (e) => {
      setImages(Array.from(e.target.files));
    };
  
    const uploadImages = async () => {
      const uploadPromises = [];
  
      if (image1) {
        const formData1 = new FormData();
        formData1.append('file', image1);
        formData1.append('upload_preset', 'images_p');
  
        uploadPromises.push(
          fetch('https://api.cloudinary.com/v1_1/dobudziej/image/upload', {
            method: 'POST',
            body: formData1,
          })
        );
      }
  
      if (image2) {
        const formData2 = new FormData();
        formData2.append('file', image2);
        formData2.append('upload_preset', 'images_p');
  
        uploadPromises.push(
          fetch('https://api.cloudinary.com/v1_1/dobudziej/image/upload', {
            method: 'POST',
            body: formData2,
          })
        );
      }
  
      images.forEach((image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'images_p');
  
        uploadPromises.push(
          fetch('https://api.cloudinary.com/v1_1/dobudziej/image/upload', {
            method: 'POST',
            body: formData,
          })
        );
      });
  
      setLoading(true);
  
      try {
        const responses = await Promise.all(uploadPromises);
        const dataPromises = responses.map((response) => response.json());
  
        const imageData = await Promise.all(dataPromises);
  
        const secureUrls = imageData.map((data) => data.secure_url);

        
        AddProduct(secureUrls[0], secureUrls[1], secureUrls.slice(2))

        setLoading(false);
      } catch (err) {
        setError('Error uploading images');
        setLoading(false);
      }
    };

    const AddProduct = async(img, img2, images) => {
        try {
            const response = await axios.post('http://localhost:5000/api/products/add', {
                title,
                desc,
                categories,
                subCategories,
                size: sizes,
                color: colors,
                price,
                price2,
                inStock,
                bestSeller,
                new: isNew,
                img,
                img2,
                images
              });

            console.log('Product added:', response.data);


        } catch (error) {
            console.log(error)
        }
    }
    console.log(desc)

  

  return (
    <div className="flex flex-col space-y-5 m-10">
      <div>
        <label>Title:</label>
        <input className='border-black border-[2px]' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
                <label>Description:</label>
                <ReactQuill
                    theme="snow"
                    value={desc}
                    onChange={setDesc}
                    modules={modules}
                    formats={formats}
                    className='border-black h-[200px] my-10'
                />

        </div>
      <div>
        <label>Categories:</label>
        <div>
          <input type="checkbox" value="Kids" onChange={(e) => handleCheckboxChange(e.target.value, setCategories)} />
          <label>Kids</label>
          <input type="checkbox" value="Women" onChange={(e) => handleCheckboxChange(e.target.value, setCategories)} />
          <label>Women</label>
          <input type="checkbox" value="Men" onChange={(e) => handleCheckboxChange(e.target.value, setCategories)} />
          <label>Men</label>
        </div>
      </div>
      <div>
        <label>Sub Categories:</label>
        <div>
          <input type="checkbox" value="T-shirt" onChange={(e) => handleCheckboxChange(e.target.value, setSubCategories)} />
          <label>T-shirt</label>
          <input type="checkbox" value="Jackets" onChange={(e) => handleCheckboxChange(e.target.value, setSubCategories)} />
          <label>Jackets</label>
          <input type="checkbox" value="Shoes" onChange={(e) => handleCheckboxChange(e.target.value, setSubCategories)} />
          <label>Shoes</label>
        </div>
      </div>
      <div>
            <label>Size:</label>
            <input className='border-blue-900 border-[2px]' type="text" value={sizes} onChange={(e) => setSizes(e.target.value.split(' '))} />
      </div>
      <div>
              <label>Color:</label>
              <div>
                    <input className='border-blue-900 border-[2px]' type="text" value={colorInput} onChange={(e) => setColorInput(e.target.value)} />
                    <button className='bg-blue-900 text-white px-5' onClick={addColor}>Add Color</button>
                    <div className='flex space-x-3'>
                        {colors.map((color, index) => (
                            <div key={index}  onClick={() => handleColorSelect(color)}
                            className="w-8 border border-black cursor-pointer h-8 rounded-full mr-2 mb-2" style={{ backgroundColor: color }}></div>
                        ))}
                    </div>
              </div>
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </div>
      <div>
        <label>Price2:</label>
        <input type="number" value={price2} onChange={(e) => setPrice2(Number(e.target.value))} />
      </div>
      <div>
        <label>In Stock:</label>
        <select value={inStock} onChange={(e) => setInStock(e.target.value === 'true')}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <div>
        <label>Best Seller:</label>
        <select value={bestSeller} onChange={(e) => setBestSeller(e.target.value === 'true')}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <div>
        <label>New:</label>
        <select value={isNew} onChange={(e) => setIsNew(e.target.value === 'true')}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <div>
        <input type="file" onChange={(e) => handleImageChange(e, setImage1)}  />
        {<img src={""} alt="Image 1" style={{ width: '100px', height: 'auto', margin: '10px' }} />}
      </div>
      <div>
        <input type="file" onChange={(e) => handleImageChange(e, setImage2)}  />
        {<img src={""} alt="Image 2" style={{ width: '100px', height: 'auto', margin: '10px' }} />}
      </div>
      <div>
        <input type="file" multiple onChange={handleMultipleImagesChange}  />
      </div>      
      <button
            onClick={uploadImages}
            className="bg-[#011936] disabled:bg-cyan-900/75 mt-6 text-white px-4 py-2 rounded hover:bg-[#011936]"
            disabled={loading}
        >
                Add Product                     
       </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Admin;
