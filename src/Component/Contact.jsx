import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiUploadCloud, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    file: null,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      toast.error("Please upload a file.");
      return;
    }

    setUploading(true);
    const formDataForUpload = new FormData();
    formDataForUpload.append("file", formData.file);
    formDataForUpload.append("upload_preset", "UjjwalProject"); // Replace with your preset
    formDataForUpload.append("cloud_name", "dij3xmbrg"); // Replace with your Cloudinary cloud name

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dij3xmbrg/auto/upload`, // Supports different file types
        {
          method: "POST",
          body: formDataForUpload,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        setUploadedUrl(data.secure_url);
        toast.success("File uploaded successfully!");
      }
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6">
      <Toaster />
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ yoyo: Infinity, duration: 1 }}
          >
            🌟 Dynamic React Form
          </motion.div>
        </h2>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="age" className="block text-sm font-medium mb-2">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="file" className="block text-sm font-medium mb-2">
            File Upload (Images, PDF, Word):
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="w-full border-gray-300 rounded-lg p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            accept="image/*,application/pdf,.doc,.docx"
            required
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 disabled:opacity-50"
          disabled={uploading}
        >
          <FiUploadCloud className="mr-2" size={20} />
          {uploading ? "Uploading..." : "Submit"}
        </motion.button>
        {uploadedUrl && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-green-600 font-medium flex items-center justify-center">
              <FiCheckCircle className="mr-2" size={20} />
              File uploaded successfully!
            </p>
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 block"
            >
              View Uploaded File
            </a>
          </motion.div>
        )}
      </motion.form>
    </div>
  );
};

export default Contact;
