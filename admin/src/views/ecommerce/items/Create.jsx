import { useEffect, useState } from "react";
import JoditTextEditor from "../../../components/textEditor/JoditTextEditor";
import FileUplodsModule from "../../../components/modules/FileUplodsModule";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import BasicProvider from "../../../authentications/BasicProvider";
import JsTreeCheckbox from "../../../components/JsTreeCheckbox";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown";
import SingleSelectDropdown from "../../../components/SingleSelectDropdown";
import { MdDelete, MdRefresh } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import { useNavigate, useParams } from "react-router-dom";
import { YYYYMMDD } from "../../../helpers/dateHelper";

import VarientFileUploadModule from "../../../components/modules/VarientFileUploadModule";
import toast from "react-hot-toast";

function Create() {
  const basicProvider = BasicProvider();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(null);

  const [categories, setCategories] = useState([]);
  const [defaultCategories, setDefaultCategories] = useState([]);

  const [attributes, setAttributes] = useState([{ name: "", values: [] }]);

  const validation = [
    {
      key: "name",
      required: true,
      maxLength: 3,
    },
  ];

  const [initialValues, setInitialValues] = useState({
    name: "",
    slug: "",
    short_content: "",
    long_content: "",
    varients: [],
    price: "",
    sale_price: "",
    discount: "",
    quantity: "unlimited",
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    faqs: { _id: "", values: [{ ques: "", ans: "" }] },
    brand: {},
    tages: [],
    categories: [],
    featured_image: "",
    gallery: [],
    publish: YYYYMMDD(new Date()),
    featured: false,
    hot: false,
    tranding: false,
    type: "simple",
  });

  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [error, setError] = useState({});

  const generateCombinations = () => {
    const validAttributes = attributes.filter(
      (attr) => attr.name && attr.values.length > 0,
    );
    if (validAttributes.length === 0) {
      toast.error("Please add at least one attribute with values");
      return;
    }

    const cartesian = (sets) => {
      return sets.reduce(
        (acc, curr) => {
          return acc.flatMap((a) =>
            curr.map((b) => [...a, { attribute: b.attrName, value: b.val }]),
          );
        },
        [[]],
      );
    };

    const attributeSets = validAttributes.map((attr) =>
      attr.values.map((v) => ({ attrName: attr.name, val: v })),
    );

    const combinations = cartesian(attributeSets);

    const newVariants = combinations.map((combo) => ({
      combination: combo,
      gallery: [],
      name: combo.map((c) => c.value).join(" / "),
      value: "",
      price: initialValues.price || "",
      sale_price: initialValues.sale_price || "",
      discount: initialValues.discount || "",
      quantity: "unlimited",
      weight: "",
      dimensions: { length: "", width: "", height: "" },
      manufacturing_date: "",
      expire_date: "",
    }));

    setInitialValues((prev) => ({ ...prev, varients: newVariants }));
    toast.success("Combinations generated!");
  };

  const handleAttributeChange = (index, field, value) => {
    const updated = [...attributes];
    if (field === "values") {
      updated[index].values = value.split(",").map((v) => v.trim());
    } else {
      updated[index].name = value;
    }
    setAttributes(updated);
  };

  const addAttributeRow = () =>
    setAttributes([...attributes, { name: "", values: [] }]);

  const handleChange = (e, index = null) => {
    const { type, name, value, checked } = e.target;

    if (index !== null) {
      setInitialValues((pre) => {
        const updatedVarients = [...pre.varients];
        const isDimension = ["length", "width", "height"].includes(name);

        updatedVarients[index] = {
          ...updatedVarients[index],
          [name]: type === "checkbox" ? checked : value,
          dimensions: isDimension
            ? { ...updatedVarients[index].dimensions, [name]: value }
            : updatedVarients[index].dimensions,
        };
        return { ...pre, varients: updatedVarients };
      });
    } else {
      setInitialValues((pre) => ({
        ...pre,
        [name]: type === "checkbox" ? checked : value,
        dimensions: ["length", "width", "height"].includes(name)
          ? { ...pre.dimensions, [name]: value }
          : pre.dimensions,
      }));
    }
  };

  const handleDeleteVarient = (index) => {
    setInitialValues((pre) => ({
      ...pre,
      varients: pre.varients.filter((_, i) => i !== index),
    }));
  };

  const fetchCategory = async () => {
    const response = await basicProvider.getMethod(
      "configuration/categories/byType/product",
    );
    setCategories(response?.data || []);
  };

  const handleAddFAQ = () => {
    setInitialValues((prev) => ({
      ...prev,
      faqs: {
        ...prev.faqs,
        values: [...(prev.faqs?.values || []), { ques: "", ans: "" }],
      },
    }));
  };

  const handleFAQChange = (index, field, value) => {
    setInitialValues((prev) => {
      const updatedValues = [...prev.faqs.values];
      updatedValues[index][field] = value;
      return { ...prev, faqs: { ...prev.faqs, values: updatedValues } };
    });
  };

  const handleRemoveFAQ = (index) => {
    setInitialValues((prev) => ({
      ...prev,
      faqs: {
        ...prev.faqs,
        values: prev.faqs.values.filter((_, i) => i !== index),
      },
    }));
  };

  const handleCancle = () => window.location.reload();

  const handleSubmit = async () => {
    const data = handleSubmitHelper(initialValues, validation, setError);
    if (!data) return;

    let response = id
      ? await basicProvider.patchMethod(`ecommerce/item/update/${id}`, data)
      : await basicProvider.postMethod("ecommerce/item/create", data);

    if (response.status === "success") {
      toast.success(response?.message);
      if (!id) navigate(`/ecommerce/item/${response?.data?._id}/edit`);
      else fetchData();
    } else {
      toast.error(response.message);
    }
  };

  const handleFileUploads = async (file) => {
    const formData = new FormData();
    formData.append("featured_image", file);
    let response = await basicProvider.postMethod("cms/files/create", formData);
    if (response.status === "success") {
      setInitialValues((pre) => ({
        ...pre,
        featured_image: response?.data?.featured_image?._id,
      }));
    }
  };

  const handleGalleryUploads = async (file) => {
    const formData = new FormData();
    file?.forEach((newfile) => formData.append("gallery", newfile?.file));
    let response = await basicProvider.postMethod("cms/files/create", formData);
    if (response.status === "success") {
      const galleryFile = response?.data?.gallery?.map((f) => f?._id);
      setInitialValues((pre) => ({ ...pre, gallery: galleryFile }));
    }
  };

  const handleVariantGalleryUpload = async (files, index) => {
    const formData = new FormData();
    files?.forEach((file) => formData.append("gallery", file?.file));

    const response = await basicProvider.postMethod(
      "cms/files/create",
      formData,
    );

    if (response.status === "success") {
      const uploadedFiles = response?.data?.gallery || [];

      setInitialValues((prev) => {
        const updated = [...prev.varients];

        updated[index].gallery = [
          ...(updated[index].gallery || []),
          ...uploadedFiles,
        ];

        return { ...prev, varients: updated };
      });

      setShowGalleryModal(false);
    }
  };

  async function fetchData() {
    const response = await basicProvider.getMethod(`ecommerce/item/by/${id}`);
    if (response.status === "success") {
      const Tages = response?.data?.tages?.map((tag) => ({
        label: tag?.name,
        value: tag?._id,
      }));
      setDefaultCategories(response?.data?.categories);
      setInitialValues((pre) => ({
        ...pre,
        ...response.data,
        featured_image: response?.data?.featured_image?._id,
        brand: {
          label: response?.data?.brand?.name,
          value: response?.data?.brand?._id,
        },
        tages: Tages,
        publish: YYYYMMDD(response?.data?.publish),
      }));
      setImage(response?.data?.featured_image);
      setGallery(response?.data?.gallery);
    }
  }

  useEffect(() => {
    if (id) fetchData();
  }, [id]);
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      <div className="flex">
        <div className="itemLeft">
          <TableLayoutComp title={"Main Details of Product"}>
            <div className="content">
              <div className="itemInput flex flex-col">
                <label className="label">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  name="name"
                  className={`input ${error.name && "customeErrorInput"}`}
                  value={initialValues?.name}
                  onChange={handleChange}
                />
                {error?.name && (
                  <span className="customeErrorMessage">{error.name}</span>
                )}
              </div>
              <div className="shortDescription">
                <label className="title">Short Description</label>
                <JoditTextEditor
                  initialValues={initialValues?.short_content}
                  setInitialValues={(v) =>
                    setInitialValues((p) => ({ ...p, short_content: v }))
                  }
                />
              </div>
              <div className="longDescription">
                <label className="title">Long Description</label>
                <JoditTextEditor
                  initialValues={initialValues?.long_content}
                  setInitialValues={(v) =>
                    setInitialValues((p) => ({ ...p, long_content: v }))
                  }
                />
              </div>
            </div>
          </TableLayoutComp>

          {/* --- ATTRIBUTE SECTION --- */}
          <TableLayoutComp
            title={"Product Attributes & Combinations"}
            showSwitch={true}
            status={initialValues.type === "variants"}
            getStatus={(s) =>
              setInitialValues((p) => ({
                ...p,
                type: s ? "variants" : "simple",
              }))
            }
          >
            {initialValues.type === "variants" && (
              <div className="cp p-4">
                <p className="text-sm text-gray-500 mb-4">
                  Enter attribute name (e.g., Color) and values separated by
                  commas (e.g., Red, Blue).
                </p>
                {attributes.map((attr, idx) => (
                  <div key={idx} className="flex gap-4 mb-2 items-center">
                    <input
                      placeholder="Attribute Name"
                      className="input w-1/3"
                      value={attr.name}
                      onChange={(e) =>
                        handleAttributeChange(idx, "name", e.target.value)
                      }
                    />
                    <input
                      placeholder="Values (Red, Blue, Green)"
                      className="input w-2/3"
                      value={attr.values.join(", ")}
                      onChange={(e) =>
                        handleAttributeChange(idx, "values", e.target.value)
                      }
                    />
                    <button
                      onClick={() =>
                        setAttributes(attributes.filter((_, i) => i !== idx))
                      }
                    >
                      <MdDelete className="text-red-500" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 mt-4">
                  <button className="cancel" onClick={addAttributeRow}>
                    Add Attribute
                  </button>
                  <button
                    className="submit flex items-center gap-2"
                    onClick={generateCombinations}
                  >
                    <MdRefresh /> Generate Variants
                  </button>
                </div>
              </div>
            )}

            {initialValues?.varients?.length > 0 &&
              initialValues.type === "variants" && (
                <div className="cp varients-table mt-6 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>Variant / Combination</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Sale Price</th>
                        <th>Qty</th>
                        <th>Weight</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {initialValues.varients.map((varient, index) => (
                        <tr key={index}>
                          <td className="font-bold text-blue-700">
                            {varient.name}
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedVariantIndex(index);
                                setShowGalleryModal(true);
                              }}
                            >
                              <img
                                src={
                                  varient.gallery?.[0]?.url || "/no-photos.png"
                                }
                                width={40}
                                alt="upload"
                              />
                              <span className="text-xs">
                                ({varient.gallery?.length || 0})
                              </span>
                            </button>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="price"
                              value={varient.price}
                              onChange={(e) => handleChange(e, index)}
                              className="input w-24"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="sale_price"
                              value={varient.sale_price}
                              onChange={(e) => handleChange(e, index)}
                              className="input w-24"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="quantity"
                              value={varient.quantity}
                              onChange={(e) => handleChange(e, index)}
                              className="input w-20"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="weight"
                              value={varient.weight}
                              onChange={(e) => handleChange(e, index)}
                              className="input w-20"
                            />
                          </td>
                          <td>
                            <MdDelete
                              className="text-red-600 cursor-pointer"
                              onClick={() => handleDeleteVarient(index)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </TableLayoutComp>

          {/* PRICING (SIMPLE ONLY) */}
          {initialValues?.type === "simple" && (
            <TableLayoutComp title={"Pricing"}>
              <div className="cp flex gap-4">
                <div className="flex-1">
                  <label className="label">Price</label>
                  <input
                    name="price"
                    value={initialValues.price}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div className="flex-1">
                  <label className="label">Sale Price</label>
                  <input
                    name="sale_price"
                    value={initialValues.sale_price}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
            </TableLayoutComp>
          )}

          <TableLayoutComp
            title={"List of FAQ's"}
            addButton={true}
            buttonCount={handleAddFAQ}
          >
            {initialValues?.faqs?.values?.map((item, index) => (
              <div
                key={index}
                className="listoffaqsCard cp relative mb-4 p-4 border rounded"
              >
                <button
                  className="absolute top-2 right-2 text-red-500"
                  onClick={() => handleRemoveFAQ(index)}
                >
                  <AiOutlineClose />
                </button>
                <label className="label">Question</label>
                <input
                  className="input mb-2"
                  value={item.ques}
                  onChange={(e) =>
                    handleFAQChange(index, "ques", e.target.value)
                  }
                />
                <JoditTextEditor
                  initialValues={item.ans}
                  setInitialValues={(v) => handleFAQChange(index, "ans", v)}
                />
              </div>
            ))}
          </TableLayoutComp>
        </div>

        <div className="itemRight">
          <TableLayoutComp title={"Publish"}>
            <div className="publishCard p-4">
              <label className="title">Publish Date</label>
              <input
                type="date"
                name="publish"
                value={initialValues.publish}
                className="input mb-4"
                onChange={handleChange}
              />
              <div className="flex flex-col gap-2">
                <label>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={initialValues.featured}
                    onChange={handleChange}
                  />{" "}
                  Featured
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="hot"
                    checked={initialValues.hot}
                    onChange={handleChange}
                  />{" "}
                  Hot Product
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="tranding"
                    checked={initialValues.tranding}
                    onChange={handleChange}
                  />{" "}
                  Trending
                </label>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="submit" onClick={handleSubmit}>
                  Submit
                </button>
                <button className="cancel" onClick={handleCancle}>
                  Cancel
                </button>
              </div>
            </div>
          </TableLayoutComp>

          <TableLayoutComp title={"Brand & Taxonomy"}>
            <div className="cp flex flex-col gap-4">
              <div>
                <label className="label">Brand</label>
                <SingleSelectDropdown
                  endPoint={"configuration/brands"}
                  value={initialValues.brand}
                  setValue={(v) =>
                    setInitialValues((p) => ({ ...p, brand: v }))
                  }
                />
              </div>
              <div>
                <label className="label">Tags</label>
                <MultiSelectDropdown
                  endPoint={"configuration/tages"}
                  value={initialValues.tages}
                  setValue={(v) =>
                    setInitialValues((p) => ({ ...p, tages: v }))
                  }
                />
              </div>
              <div>
                <label className="label">Categories</label>
                <JsTreeCheckbox
                  data={categories}
                  defaultChecked={defaultCategories}
                  onCheck={(c) =>
                    setInitialValues((p) => ({ ...p, categories: c }))
                  }
                />
              </div>
            </div>
          </TableLayoutComp>

          <TableLayoutComp title={"Featured Image"}>
            <div className="cp">
              <FileUplodsModule
                initialValues={image}
                setInitialValues={(f) => handleFileUploads(f[0]?.file)}
                type="featured_image"
              />
            </div>
          </TableLayoutComp>

          {initialValues.type === "simple" && (
            <TableLayoutComp title={"Gallery"}>
              <FileUplodsModule
                initialValues={gallery}
                setInitialValues={(f) => handleGalleryUploads(f)}
                type="gallery"
              />
            </TableLayoutComp>
          )}
        </div>
      </div>
      {showGalleryModal && selectedVariantIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]">
          <div className="bg-white rounded-2xl p-6 w-[60%] max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-3 right-3 text-2xl"
              onClick={() => setShowGalleryModal(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4">
              Upload Images for:{" "}
              {initialValues.varients[selectedVariantIndex]?.name}
            </h2>

            <VarientFileUploadModule
              initialValues={
                initialValues.varients[selectedVariantIndex]?.gallery || []
              }
              setInitialValues={(f) =>
                handleVariantGalleryUpload(f, selectedVariantIndex)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Create;
