import { useEffect, useState } from "react";
import { GrUpload } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

function VarientFileUploadModule({ initialValues = [], setInitialValues }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (Array.isArray(initialValues)) {
      setFiles(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setFiles((prev) => {
      const updated = [...prev, ...selectedFiles];
      setInitialValues(updated);
      return updated;
    });
  };

  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.url?.startsWith("blob:")) URL.revokeObjectURL(f.url);
      });
    };
  }, [files]);

  const handleRemove = (file, index) => {
    if (file.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);

    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      setInitialValues(updated);
      return updated;
    });
  };

  return (
    <>
      <div>
        <input
          type="file"
          id="varient"
          multiple={true}
          className="hidden"
          onChange={handleChange}
        />
        <label
          htmlFor="varient"
          className="inputFile flex items-center gap-2 cursor-pointer px-3 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          <GrUpload /> <span>Choose a File...</span>
        </label>
      </div>
      <div className="varientPreview cp flex gap-2">
        {files?.map((file, index) => (
          <div className="relative" key={index}>
            <img src={file?.url || file} alt="not found" width={80} />
            <RxCross2
              className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer hover:bg-red-100"
              onClick={() => handleRemove(file, index)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default VarientFileUploadModule;
