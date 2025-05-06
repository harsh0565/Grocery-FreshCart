import React, { useState } from 'react'
import { assets, categories } from '../../assets/assets';
import axios from 'axios'
import toast from 'react-hot-toast';
const AddProduct = () => {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');



    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log(files);

            const formData = new FormData();
            const productData = {
                name,
                description: description.split('\n'),
                category,
                price,
                offerPrice,
            };
            formData.append('productData', JSON.stringify(productData));
          
            files.forEach((file) => {
                if (file) {
                    formData.append('images', file); 
                }
            });

          


            const { data } = await axios.post('/api/product/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (data?.success) {
                toast.success(data.message);
                setName('');
                setDescription('');
                setCategory('');
                setPrice('');
                setOfferPrice('');
                setFiles([]);
            } else {
                toast.error(data.message || "Failed to add product");
            }
        } catch (error) {
            console.error("Error:", error);
            // toast.error(error?.response?.data?.message || error.message);
        }
    };



    return (
        <div className="no-scrollbar overflow-y-scroll py-10 flex flex-col justify-between">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input

                                    onChange={(e) => {
                                        const updatedFiles = [...files];
                                        updatedFiles[index] = e.target.files[0];
                                        setFiles(updatedFiles);
                                    }
                                    }

                                    accept="image/*" type="file" id={`image${index}`} hidden />
                                <img className="max-w-24 cursor-pointer" src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area} alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        id="product-name" type="text" placeholder="Type here" name="name" value={name} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        id="product-description" rows={4} name="description" value={description} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        name='category' value={category}
                        id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.path}>{category.path}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            name="price" value={price}
                            id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input
                            name="offerPrice" value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button className="px-8 py-2.5 bg-primary text-white font-medium rounded">ADD</button>
            </form>
        </div>
    );
};
export default AddProduct


// import React, { useState } from 'react';
// import { assets, categories } from '../../assets/assets';
// import toast from 'react-hot-toast';
// import axios from 'axios';

// const AddProduct = () => {
// const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     category: '',
//     price: '',
//     offerPrice: '',
// });


// const [files, setFiles] = useState([]);

// const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setProductData((prev) => ({
//         ...prev,
//         [name]: value,
//     }));
// };

// const handleImageChange = (e, index) => {
//     const newFiles = [...files];
//     newFiles[index] = e.target.files[0];
//     setFiles(newFiles);

// }

//     const onSubmitHandler = async(e) => {
//         e.preventDefault();

//         try {
//             console.log(productData);
//             console.log(files);
//             const formData = new FormData();

//             Object.entries(productData).forEach(([key, value]) => {
//                 formData.append(key, value);
//             });

//             // // Append images
//             files.forEach((file) => {
//                 if (file) {
//                     formData.append('images', file);
//                 }
//             });


//             try {
//                 const response = await axios.post('/api/product/add', formData, {
//                   headers: {
//                     'Content-Type': 'multipart/form-data',
//                   },
//                 });

//                 console.log('Product added:', response.data);
//               } catch (error) {
//                 console.error('Upload failed:', error.response?.data || error.message);
//               }

//             if (data?.success) {
//                 toast.success(data.message || 'Product added!');
//                 setProductData({
//                     name: '',
//                     description: '',
//                     category: '',
//                     price: '',
//                     offerPrice: '',
//                 });
//                 setFiles([]);
//             } else {
//                 toast.error(data.message || 'Something went wrong');
//             }
//         } catch (error) {
//             toast.error("error");
//         }
//     };

// new method
//     const [files, setFiles] = useState([]);
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [category, setCategory] = useState('');
//     const [price, setPrice] = useState('');
//     const [offerPrice, setOfferPrice] = useState('');

//     const handleImageChange = (e, index) => {
//         const newFiles = [...files];
//         newFiles[index] = e.target.files[0];
//         setFiles(newFiles);
//     };
//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             const productData = {
//                 name,
//                 description: description.split('\n'),
//                 category,
//                 price,
//                 offerPrice,
//                 // images: files,
//             };
//             console.log(productData);
//             console.log(files);
//             const formData = new FormData();
//             formData.append('productData', JSON.stringify(productData));
//             for (let i = 0; i < files.length; i++) {
//                 formData.append('images', files[i]);
//             }
//             const {data} = await axios.post('/api/product/add', formData);
//             if (data?.success) {
//                 toast.success(data.message);
//                 setName('');
//                 setDescription('');
//                 setCategory('');
//                 setPrice('');
//                 setOfferPrice('');
//                 setFiles([]);
//             } else {
//                 toast.error(data.message);
//             }


//         } catch (error) {
//             toast.error(error.message);
//         }
//     }

//     return (
//         <div className="no-scrollbar overflow-y-scroll py-10 flex flex-col justify-between">
//             <form
//                 onSubmit={onSubmitHandler}
//                 className="md:p-10 p-4 space-y-5 max-w-lg"
//                 encType="multipart/form-data"
//             >
//                 {/* Product Image Upload */}
//                 <div>
//                     <p className="text-base font-medium">Product Image</p>
//                     <div className="flex flex-wrap items-center gap-3 mt-2">
//                         {Array(4).fill('').map((_, index) => (
//                             <label key={index} htmlFor={`image${index}`}>
//                                 <input
//                                     name="images"
//                                     onChange={(e) => handleImageChange(e, index)}
//                                     accept="image/*"
//                                     type="file"
//                                     id={`image${index}`}
//                                     hidden
//                                 />
//                                 <img
//                                     className="max-w-24 cursor-pointer"
//                                     src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
//                                     alt={`Upload slot ${index + 1}`}
//                                     width={100}
//                                     height={100}
//                                 />
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Product Name */}
//                 <div className="flex flex-col gap-1 max-w-md">
//                     <label htmlFor="product-name" className="text-base font-medium">Product Name</label>
//                     <input
//                         id="product-name"
//                         type="text"
//                         placeholder="Type here"
//                         name="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//                         required
//                     />
//                 </div>

//                 {/* Description */}
//                 <div className="flex flex-col gap-1 max-w-md">
//                     <label htmlFor="product-description" className="text-base font-medium">Product Description</label>
//                     <textarea
//                         id="product-description"
//                         rows={4}
//                         name="description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
//                         placeholder="Type here"
//                     />
//                 </div>

//                 {/* Category */}
//                 <div className="w-full flex flex-col gap-1">
//                     <label htmlFor="category" className="text-base font-medium">Category</label>
//                     <select
//                         name="category"
//                         id="category"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                         className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//                         required
//                     >
//                         <option value="">Select Category</option>
//                         {categories.map((cat, index) => (
//                             <option key={index} value={cat.path}>{cat.path}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Price & Offer Price */}
//                 <div className="flex items-center gap-5 flex-wrap">
//                     <div className="flex-1 flex flex-col gap-1 w-32">
//                         <label htmlFor="product-price" className="text-base font-medium">Product Price</label>
//                         <input
//                             id="product-price"
//                             type="number"
//                             placeholder="0"
//                             name="price"
//                             value={price}
//                             onChange={(e) => setPrice(e.target.value)}
//                             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//                             required
//                         />
//                     </div>
//                     <div className="flex-1 flex flex-col gap-1 w-32">
//                         <label htmlFor="offer-price" className="text-base font-medium">Offer Price</label>
//                         <input
//                             id="offer-price"
//                             type="number"
//                             placeholder="0"
//                             name="offerPrice"
//                             value={offerPrice}
//                             onChange={(e) => setOfferPrice(e.target.value)}
//                             className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
//                             required
//                         />
//                     </div>
//                 </div>

//                 <button type="submit" className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">ADD</button>
//             </form>
//         </div>
//     );
// };

// export default AddProduct;
