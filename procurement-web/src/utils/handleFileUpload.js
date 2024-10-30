import axios from 'axios';

 
 const handleFileUpload = async (uploadFile) => {
    const cloudinaryID = import.meta.env.VITE_REACT_APP_CLOUDINARY_ID;
    try {
        const formData = new FormData(); 
        formData.append('file', uploadFile);
        formData.append('upload_preset', 'socialmedia');
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryID}/image/upload`,
          formData
        );
    
        return response.data.secure_url;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    };

export default handleFileUpload