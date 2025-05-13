import { useEffect, useRef, useState } from 'react';
import { Search, ChevronDown, Save, CheckCircle, XCircle, Plus, Upload } from 'lucide-react';
import Logo from "../../assets/Stinger.png"
import AdminSidebar from './AdminSidebar';
import Axios from '../../utils/axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const ProductForm = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const fileInputRef = useRef(null);
  const availableSize = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'UK6', 'UK7', 'UK8', 'UK9', 'UK10', 'UK11', 'UK12'];
  const availableColors = [
    { value: '#FF0000', label: 'Red' },
    { value: '#00FF00', label: 'Green' },
    { value: '#0000FF', label: 'Blue' },
    { value: '#FFFF00', label: 'Yellow' },
    { value: '#FF00FF', label: 'Pink' },
    { value: '#00FFFF', label: 'Cyan' },
    { value: '#000000', label: 'Black' },
    { value: '#FFFFFF', label: 'White' }
  ];
  const [size, setSize] = useState(['XS']);
  const [selectedColor, setSelectedColor] = useState<any>('');
  const [selectedColors, setSelectedColors] = useState<any>([]);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [showDefaultImage, setShowDefaultImage] = useState(true);
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);


  const handleColorChange = (colorValue: any) => {
    if (!colorValue) return;

    const colorExists = selectedColors.some((color: any) => color.value === colorValue);

    if (!colorExists) {
      const colorToAdd = availableColors.find(color => color.value === colorValue);
      setSelectedColors([...selectedColors, colorToAdd]);
    }

    // Reset dropdown after selection
    setSelectedColor('');
  };

  // Remove a color from the selected colors
  const removeColor = (colorValue: any) => {
    setSelectedColors(selectedColors.filter((color: any) => color.value !== colorValue));
  };

  const getColorLabelsForAPI = () => {
    return selectedColors.map((color: any) => color.label);
  };

  const handleSizeClick = (_size: any) => {
    if (size.includes(_size)) {
      setSize(size.filter(_s => _s !== _size));
    } else {
      setSize([...size, _size])
    }
  };



  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchCategory = async () => {
    try {
      const cachedCategory: any = localStorage.getItem('cachedCategory');
      if (cachedCategory) {
        setCategories(JSON.parse(cachedCategory));
        return;
      }
      const categoryResponse: any = await Axios.get('/category');
      if (categoryResponse) {
        localStorage.setItem('cachedCategory', JSON.stringify(categoryResponse?.data?.categories));
        setCategories(categoryResponse?.data?.categories);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }

  }

  const handleProductCategoryChange = (e: any) => {
    setCategoryId(e.target.value)
  }

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageSelect = (index: any) => {
    setSelectedImageIndex(index);
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: any = [...images];
      const newImageFiles = [...imageFiles];

      for (let i = 0; i < files.length; i++) {
        if (newImages.length < 8) {
          const file = files[i];
          const imageUrl = URL.createObjectURL(file);
          newImages.push(imageUrl);
          newImageFiles.push(file);
        }
      }

      setShowDefaultImage(false);
      setImages(newImages);
      setImageFiles(newImageFiles);
      setSelectedImageIndex(newImages.length - 1);
    }
  };

  const handleRemoveImage = (index: any, e: any) => {
    e.stopPropagation();
    const newImages = [...images];
    const newImageFiles = [...imageFiles];

    newImages.splice(index, 1);
    newImageFiles.splice(index, 1);

    if (newImages.length === 0) {
      setShowDefaultImage(true);
      setSelectedImageIndex(0);
    } else if (index === selectedImageIndex && index > 0) {
      setSelectedImageIndex(index - 1);
    } else if (selectedImageIndex >= newImages.length) {
      setSelectedImageIndex(newImages.length - 1);
    }

    setImages(newImages);
    setImageFiles(newImageFiles);
  };


  const handleSubmitForm = async (event: any) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('stock', stock.toString());
      formData.append('categoryId', categoryId);
      formData.append('color', JSON.stringify(getColorLabelsForAPI()));
      formData.append('size', JSON.stringify(size));

      if (imageFiles.length > 0) {
        // Use the same field name 'images' as specified in the FilesInterceptor
        imageFiles.forEach(file => {
          formData.append('imageURLs', file);
        });

      }

      const response = await Axios.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setName("");
      setDescription("");
      setSize(['XS']);
      setSelectedColor('');
      setSelectedColors([]);
      setImages([]);
      setImageFiles([]);
      setShowDefaultImage(true);
      setCategories([])
      setCategoryId("");
      setPrice(0);
      setStock(0);




    } catch (error) {
      console.error('Error creating product:', error);
    }

  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-medium">OverView</span>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm w-64"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <span className="text-xs bg-gray-300 rounded px-1">K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="border border-gray-200 rounded-lg px-3 py-2 flex items-center">
              <span className="mr-2 text-sm">Feb</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            <div className="border border-gray-200 rounded-lg px-3 py-2 flex items-center">
              <span className="mr-2 text-sm">Sales</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-medium">Kamisato Aya</div>
                <div className="text-xs text-gray-500">Manager</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Form */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 9L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h1 className="text-xl font-medium">Add New Product</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 border border-gray-200 rounded-full">
                <Save className="w-4 h-4 mr-2" />
                <span>Save Draft</span>
              </button>
              <button onClick={handleSubmitForm} className="flex items-center px-4 py-2 bg-green-400 text-white rounded-full">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              {/* General Information */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <h2 className="text-lg font-medium mb-4">General Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name Product</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-100 rounded-md"
                      placeholder='Product Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description Product</label>
                    <textarea
                      className="w-full p-3 bg-gray-100 rounded-md h-32"
                      placeholder='Description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Size and Color */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="bg-white rounded-lg p-6 flex-grow-[3]">
                  <h2 className="text-sm font-medium mb-1">Size</h2>
                  <p className="text-xs text-gray-500 mb-2">Pick Available Size</p>
                  <div className="flex flex-wrap gap-2">
                    {availableSize.map((_size) => (
                      <button
                        key={_size}
                        className={`px-6 py-2 rounded ${size.includes(_size) ? 'bg-green-200' : 'bg-gray-100'
                          }`}
                        onClick={() => handleSizeClick(_size)}
                      >
                        {_size}
                      </button>
                    ))}
                  </div>
                  {size.length > 0 && (
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Selected: </span>
                      {size.join(', ')}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg p-6 flex-grow-[1]">
                  <h2 className="text-sm font-medium mb-1">Color</h2>
                  <p className="text-xs text-gray-500 mb-2">Select Available Colors</p>
                  <div className="relative">
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={selectedColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                    >
                      <option value="">Select a color</option>
                      {availableColors.map((color) => (
                        <option key={color.value} value={color.value}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedColors.map((color: any, index: any) => (
                        <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: color.value }}
                          ></div>
                          <span className="text-sm">{color.label}</span>
                          <button
                            className="ml-2 text-gray-500 hover:text-red-500"
                            onClick={() => removeColor(color.value)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing and Stock */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Pricing And Stock</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Base Pricing</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-100 rounded-md"
                      // defaultValue="$47.55"
                      value={price}
                      onChange={(e: any) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Stock</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-100 rounded-md"
                      // defaultValue="77"
                      value={stock}
                      onChange={(e: any) => setStock(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Discount</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-100 rounded-md"
                      defaultValue="10%"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              {/* Upload Image */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <h2 className="text-lg font-medium mb-4">Upload Img</h2>
                <div className="mb-4 relative group">
                  <img
                    src={showDefaultImage ? Logo : images[selectedImageIndex]}
                    alt="Product"
                    className="w-full h-64 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg">
                    <button
                      onClick={handleAddImage}
                      className="bg-white p-2 rounded-full shadow-lg"
                    >
                      <Upload className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                  accept="image/*"
                />

                <div className="flex flex-wrap gap-2">
                  {images.map((image, idx) => (
                    <div
                      key={idx}
                      className={`relative ${idx === selectedImageIndex ? 'border-2 border-green-400' : 'border border-gray-200'
                        } rounded-lg overflow-hidden cursor-pointer group`}
                      onClick={() => handleImageSelect(idx)}
                    >
                      <img
                        src={image}
                        alt={`Product ${idx + 1}`}
                        className="w-16 h-16 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={(e) => handleRemoveImage(idx, e)}
                          className="bg-white p-1 rounded-full"
                        >
                          <XCircle className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div
                    className="w-16 h-16 border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100"
                    onClick={handleAddImage}
                  >
                    <Plus className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Category</h2>
                {/* <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Product Category</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-3 bg-gray-100 rounded-md"
                      defaultValue="Jacket"
                    />
                    <XCircle className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                </div> */}
                <FormControl className="!mb-4" fullWidth>
                  <InputLabel className="!block !text-sm !font-medium !mb-1" id="demo-simple-select-label">Product Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryId}
                    label="Product Category"
                    onChange={handleProductCategoryChange}
                  >
                    {categories?.map((data: any, index: any) => (
                      <MenuItem key={index} value={data.id}>{data?.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <button className="flex items-center px-4 py-2 bg-green-100 text-green-600 rounded-full">
                  <Plus className="w-4 h-4 mr-2" />
                  <span>Add Category</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;