import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

export const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center mb-6">
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-white rounded-full p-1 shadow"
            title="Remove"
          >
            <LuTrash />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onChooseFile}
          className="flex items-center gap-2 px-4 py-2 bg-slate-200 rounded-full"
        >
          <LuUpload /> Upload Photo
        </button>
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
