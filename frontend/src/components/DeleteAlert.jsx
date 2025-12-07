import React from "react";
import { LuTrash } from "react-icons/lu";

function DeleteAlert({
  content = "Are you sure?",
  onDelete = () => {},
  onCancel = () => {},
}) {
  return (
    <div>
      <p className="text-sm text-gray-700">{content}</p>
      <div className="flex justify-end mt-6 gap-3">
        <button
          type="button"
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="button"
          className="px-4 py-2 inline-flex items-center gap-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          onClick={onDelete}
          aria-label="Delete"
        >
          <LuTrash className="text-lg" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default DeleteAlert;
