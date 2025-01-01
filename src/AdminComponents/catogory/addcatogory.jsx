// import React, { useState } from "react";
// import "../../adminCss/catogory/AddCategory.css";
// import { makeApi } from "../../api/callApi";
// import uploadToCloudinary from "../../utils/cloudinaryUpload";

// const AddCategory = () => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [subcategories, setSubcategories] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleImageUpload = async (file, setImageState) => {
//     try {
//       const imageUrl = await uploadToCloudinary(file, setUploadProgress);
//       setImageState(imageUrl);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       setErrorMessage("Failed to upload image. Please try again.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await makeApi("/api/add-category", "POST", {
//         name,
//         image,
//         subcategorieslist: subcategories,
//       });

//       alert("Category added successfully");
//       setName("");
//       setImage(null);
//       setSubcategories([]);
//     } catch (error) {
//       console.error("Error adding category:", error);
//       setErrorMessage("Error adding category. Please try again.");
//     }
//   };

//   const handleSubcategoryChange = (index, field, value) => {
//     const updatedSubcategories = subcategories.map((subcategory, i) =>
//       i === index ? { ...subcategory, [field]: value } : subcategory
//     );
//     setSubcategories(updatedSubcategories);
//   };

//   const addSubcategory = () => {
//     setSubcategories([...subcategories, { name: "", image: null }]);
//   };

//   const removeSubcategory = (index) => {
//     const updatedSubcategories = subcategories.filter((_, i) => i !== index);
//     setSubcategories(updatedSubcategories);
//   };

//   return (
//     <div className="add-category">
//       <h2>Add Category</h2>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="image">Category Image:</label>
//           <input
//             type="file"
//             id="image"
//             onChange={(e) => handleImageUpload(e.target.files[0], setImage)}
//             required
//           />
//           {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
//         </div>

//         {/* Subcategory Section */}
//         <div className="subcategory-section">
//           <h3>Subcategories</h3>
//           {subcategories.map((subcategory, index) => (
//             <div key={index} className="subcategory-form">
//               <div className="form-group">
//                 <label htmlFor={`subcategory-name-${index}`}>
//                   Subcategory Name:
//                 </label>
//                 <input
//                   type="text"
//                   id={`subcategory-name-${index}`}
//                   value={subcategory.name}
//                   onChange={(e) =>
//                     handleSubcategoryChange(index, "name", e.target.value)
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor={`subcategory-image-${index}`}>
//                   Subcategory Image:
//                 </label>
//                 <input
//                   type="file"
//                   id={`subcategory-image-${index}`}
//                   onChange={(e) =>
//                     handleImageUpload(e.target.files[0], (imageUrl) =>
//                       handleSubcategoryChange(index, "image", imageUrl)
//                     )
//                   }
//                   required
//                 />
//               </div>
//               <button
//                 type="button"
//                 onClick={() => removeSubcategory(index)}
//                 className="btn btn-danger"
//               >
//                 Remove Subcategory
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addSubcategory}
//             className="btn btn-warning my-4"
//           >
//             Add Subcategory
//           </button>
//         </div>

//         <div className="text-center">
//           <button
//             type="submit"
//             className="admin_add_product_button add_category_button"
//           >
//             Add Category
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddCategory;

import React, { useState } from "react";
import "../../adminCss/catogory/AddCategory.css";
import { makeApi } from "../../api/callApi";
import uploadToCloudinary from "../../utils/cloudinaryUpload";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleImageUpload = async (file, setImageState) => {
    try {
      const imageUrl = await uploadToCloudinary(file, setUploadProgress);
      setImageState(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeApi("/api/add-category", "POST", {
        name,
        image,
        subcategorieslist: subcategories,
      });

      alert("Category added successfully");
      // setName("");
      // setImage(null);
      // setSubcategories([]);
    } catch (error) {
      console.error("Error adding category:", error);
      setErrorMessage("Error adding category. Please try again.");
    }
  };

  const handleSubcategoryChange = (index, field, value) => {
    const updatedSubcategories = subcategories.map((subcategory, i) =>
      i === index ? { ...subcategory, [field]: value } : subcategory
    );
    setSubcategories(updatedSubcategories);
  };

  const addSubcategory = () => {
    setSubcategories([
      ...subcategories,
      { name: "", image: null, positionId: subcategories.length + 1 },
    ]);
  };

  const removeSubcategory = (index) => {
    const updatedSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(
      updatedSubcategories.map((subcategory, i) => ({
        ...subcategory,
        positionId: i + 1,
      }))
    );
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    const reorderedSubcategories = [...subcategories];
    const [draggedItem] = reorderedSubcategories.splice(draggedIndex, 1);
    reorderedSubcategories.splice(index, 0, draggedItem);

    setSubcategories(
      reorderedSubcategories.map((subcategory, i) => ({
        ...subcategory,
        positionId: i + 1,
      }))
    );
    setDraggedIndex(null);
  };

  return (
    <div className="add-category">
      <h2>Add Category</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Category Image:</label>
          <input
            type="file"
            id="image"
            onChange={(e) => handleImageUpload(e.target.files[0], setImage)}
            required
          />
          {image && <img src={image} alt="Category" className="preview-image" />}
          {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
        </div>

        <div className="subcategory-section">
          <h3>Subcategories</h3>
          <ul className="subcategories-list">
            {subcategories.map((subcategory, index) => (
              <li
                key={index}
                className="subcategory-item"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
              >
                <div className="subcategory-form">
                  <div className="form-group">
                    <label htmlFor={`subcategory-name-${index}`}>
                      Subcategory Name:
                    </label>
                    <input
                      type="text"
                      id={`subcategory-name-${index}`}
                      value={subcategory.name}
                      onChange={(e) =>
                        handleSubcategoryChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`subcategory-image-${index}`}>
                      Subcategory Image:
                    </label>
                    <input
                      type="file"
                      id={`subcategory-image-${index}`}
                      onChange={(e) =>
                        handleImageUpload(e.target.files[0], (imageUrl) =>
                          handleSubcategoryChange(index, "image", imageUrl)
                        )
                      }
                      required
                    />
                    {subcategory.image && (
                      <img
                        src={subcategory.image}
                        alt="Subcategory"
                        className="preview-image"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSubcategory(index)}
                    className="btn btn-danger"
                  >
                    Remove Subcategory
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={addSubcategory}
            className="btn btn-warning my-4"
          >
            Add Subcategory
          </button>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="admin_add_product_button add_category_button"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
