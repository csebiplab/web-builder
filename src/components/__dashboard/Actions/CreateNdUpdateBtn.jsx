"use client";

export default function CreateNdUpdateBtn({ handleSubmit, isLoading, id }) {
  return (
    <button
      type="submit"
      aria-label="Submit"
      onClick={handleSubmit}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 my-5 px-5 border border-blue-500 hover:border-transparent rounded"
      disabled={isLoading}
    >
      {!id
        ? "Save"
        : id && !isLoading
        ? "Update"
        : id && isLoading
        ? "Updating..."
        : "Submitting..."}
    </button>
  );
}
