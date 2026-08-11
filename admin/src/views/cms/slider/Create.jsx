import Nestable from "react-nestable";
import "react-nestable/dist/styles/index.css";
import { useState } from "react";
import { MdCloudUpload, MdDelete, MdEdit } from "react-icons/md";
import { IoMenuOutline } from "react-icons/io5";
import SubHeader from "../../../components/SubHeader";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import GalleryPopup from "../../../components/custome/GalleryPopup";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import { useNavigate, useParams } from "react-router-dom";
import BasicProvider from "../../../authentications/BasicProvider";
import toast from "react-hot-toast";
import { useEffect } from "react";

function Create() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const basicProvider = BasicProvider();
  const [selectedItem, setSelectedItem] = useState([]);
  const [deleteFile, setDeletedFile] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    slug: "",
    gallery: [],
  });

  console.log("initialValues", initialValues);
  console.log("deleteFile", deleteFile);

  const fetchData = async () => {
    const response = await basicProvider.getMethod(`cms/slider/by/${id}`);

    setInitialValues(response.data);
  };

  const handleOnchange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const selectedFiles = Array.from(files).map((file, i) => ({
        _id: `temp-${Date.now()}-${i}`,
        file,
        url: URL.createObjectURL(file),
        isUploading: true,
      }));

      setInitialValues((pre) => ({
        ...pre,
        gallery: [...pre?.gallery, ...selectedFiles],
      }));

      handleGalleryUploads(files, selectedFiles);
    } else {
      setInitialValues((pre) => ({
        ...pre,
        [name]: value,
      }));
    }
  };

  const handleGalleryUploads = async (files, tempFiles) => {
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("gallery", file);
      });

      const response = await basicProvider.postMethod(
        "cms/files/create",
        formData
      );

      if (response?.status === "success") {
        setInitialValues((pre) => {
          const filteredGallery = pre.gallery.filter(
            (item) => !tempFiles.find((f) => f._id === item._id)
          );

          return {
            ...pre,
            gallery: [
              ...filteredGallery,
              ...response?.data?.gallery?.map((file) => ({
                _id: file._id,
                url: file.url,
                file: null,
              })),
            ],
          };
        });

        toast.success("Files uploaded successfully!");
      } else {
        toast.error(response?.message || "File upload failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while uploading files");
    }
  };

  const handleRemoveGallery = (file, id) => {
    if (file.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
    const removeFiles = initialValues?.gallery?.filter((file) => {
      return file._id !== id;
    });
    setInitialValues((pre) => ({ ...pre, gallery: removeFiles }));

    const removeGallery = initialValues?.gallery
      ?.filter((file) => {
        return file._id == id;
      })
      .map((file) => file?._id?._id);
    setDeletedFile((pre) => [...pre, ...removeGallery]);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setOpen(true);
    document.body.style.overflow = "hidden";
    document.getElementById("galleryPage").style.opacity = "0.5";
  };

  const handleFileDelete = async () => {
    await basicProvider.postMethod(
      "cms/slider/delete/files",
      JSON.stringify(deleteFile)
    );
  };

  const handleSubmit = async () => {
    let response = "";
    const data = handleSubmitHelper(initialValues);

    if (deleteFile.length > 0) {
      handleFileDelete();
    }

    if (data) {
      if (id) {
        response = await basicProvider.patchMethod(
          `cms/slider/update/${id}`,
          data
        );
      } else {
        response = await basicProvider.postMethod("cms/slider/create", data);
        if (response?.data) {
          navigate(`/cms/sliders/${response?.data?._id}/edit`);
        }
      }
    }

    if (response.status === "success") {
      toast.success(response.message);
      fetchData();
    } else {
      toast.error(response.message);
    }
  };

  const renderItem = ({ item }) => (
    <div className="galleryCard">
      <div className="galleryCardLeft flex items-center">
        <IoMenuOutline className="text-3xl cursor-pointer" />
        <div className="galleryImage">
          <img
            src={item?.url || item?._id?.url || item?.file?.url}
            alt="not found"
          />
        </div>
      </div>
      <div className="galleryCardRight">
        <span>
          <MdEdit
            className="text-2xl cursor-pointer"
            onClick={() => handleEdit(item)}
          />
        </span>
        <span>
          <MdDelete
            className="text-2xl cursor-pointer"
            onClick={() => {
              handleRemoveGallery(item, item?._id);
            }}
          />
        </span>
      </div>
    </div>
  );

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);

  return (
    <div className="relative">
      <div className="w-full" id="galleryPage">
        <div className="galleryPage">
          <TableLayoutComp title={"Slider"}>
            <div className="w-full flex gap-4 bg-white borderRadius cp border-1 border-gray-300">
              <div className="w-full">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={initialValues?.name}
                  className="input"
                  onChange={handleOnchange}
                  placeholder="Enter Slider Name"
                />
              </div>
              <div className="w-full">
                <label htmlFor="slug" className="label">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={initialValues?.slug}
                  className="input"
                  onChange={handleOnchange}
                  placeholder="Enter Slug Name"
                />
              </div>
            </div>
          </TableLayoutComp>

          <div className="galleryUpload">
            <label htmlFor="galleryupload">
              <div className="galleryIcon">
                <div className="w-full flex justify-center">
                  <MdCloudUpload className="text-4xl text-[#63B2DD]" />
                </div>
                <div>Click or Drag to Upload</div>
              </div>
            </label>
            <input
              type="file"
              multiple
              id="galleryupload"
              className="hidden"
              onChange={handleOnchange}
            />
          </div>

          {initialValues?.gallery?.length > 0 && (
            <TableLayoutComp title={"Gallery Images"}>
              <div className="w-full cp">
                <Nestable
                  items={initialValues?.gallery || []}
                  renderItem={renderItem}
                  maxDepth={1}
                  idProp={"_id"}
                  onChange={(order) => {
                    setInitialValues((pre) => ({
                      ...pre,
                      gallery: order?.items,
                    }));
                  }}
                />
              </div>
            </TableLayoutComp>
          )}

          <div className="w-full gallerySubmit cp flex justify-center bg-white borderRadius">
            <div className="flex gap-2">
              <button className="submit" onClick={handleSubmit}>
                Submit
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setInitialValues({
                    name: "",
                    slug: "",
                    gallery: [],
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && selectedItem && (
        <GalleryPopup
          open={open}
          setOpen={setOpen}
          item={selectedItem}
          setInitialValues={setInitialValues}
        />
      )}
    </div>
  );
}

export default Create;
