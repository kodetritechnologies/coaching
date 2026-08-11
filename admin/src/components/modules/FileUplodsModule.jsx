import { useEffect, useState } from "react";
import { GrUpload } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

function FileUplodsModule({
  initialValues = null,
  setInitialValues,
  type = "featured_image",
}) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!initialValues) {
      setFiles([]);
      return;
    }

    if (Array.isArray(initialValues)) {
      const formatted = initialValues?.map((file) =>
        typeof file === "string"
          ? { url: file }
          : { ...file, url: file?.url || "" }
      );
      setFiles(formatted);
    } else if (typeof initialValues === "object" && initialValues?.url) {
      setFiles([{ ...initialValues }]);
    } else {
      setFiles([]);
    }
  }, [initialValues]);

  useEffect(() => {
    if (files?.length > 0 && files[0]?.file) {
      setInitialValues(files);
    }
  }, [files]);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files)?.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    if (type === "featured_image") {
      files.forEach(
        (f) => f.url?.startsWith("blob:") && URL.revokeObjectURL(f.url)
      );
      setFiles(selectedFiles);
    } else {
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleRemove = (file, index) => {
    if (file.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const isSingle =
    type === "featured_image" ||
    (files.length === 1 && typeof initialValues === "object");
  const imageSize = isSingle ? 80 : 60;

  return (
    <>
      <div>
        <input
          type="file"
          id={`file-${type}`}
          multiple={type !== "featured_image"}
          className="hidden"
          onChange={handleChange}
        />
        <label
          htmlFor={`file-${type}`}
          className="inputFile flex items-center gap-2 cursor-pointer px-3 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          <GrUpload /> <span>Choose a File...</span>
        </label>
      </div>

      {files?.length > 0 && (
        <label className="label mt-2 block">
          {type === "featured_image"
            ? "Featured Image"
            : type === "gallery"
            ? "Gallery"
            : type === "document"
            ? "Documents"
            : ""}
        </label>
      )}

      {files?.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-2">
          {files?.map((file, index) => (
            <span
              key={index}
              className="relative rounded-2xl border border-gray-400 overflow-hidden"
              style={{
                width: `${imageSize}px`,
                height: `${imageSize}px`,
              }}
            >
              <RxCross2
                className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer hover:bg-red-100"
                onClick={() => handleRemove(file, index)}
              />
              <img
                src={file?.url}
                alt="preview"
                className="w-full h-full object-cover rounded-2xl"
              />
            </span>
          ))}
        </div>
      )}
    </>
  );
}

export default FileUplodsModule;
