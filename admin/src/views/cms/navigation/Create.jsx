import { useEffect, useState } from "react";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import { AiOutlineClose } from "react-icons/ai";
import { MdCloudUpload, MdEdit } from "react-icons/md";
import BasicProvider from "../../../authentications/BasicProvider";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Nestable from "react-nestable";
import "react-nestable/dist/styles/index.css";

function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const basicProvider = BasicProvider();
  
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [items, setItems] = useState([]);

  // For the custom link form on the left
  const [linkForm, setLinkForm] = useState({ title: "", url: "", description: "" });
  const [iconType, setIconType] = useState("none");
  const [iconValue, setIconValue] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await basicProvider.getMethod(`cms/navigation/by/${id}`);
      if (response.status === "success") {
        setName(response.data.name);
        setSlug(response.data.slug || "");
        setItems(response.data.items || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleIconUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIconType("image");
    setIconFile(file);
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("featured_image", file); // Or "gallery" if preferred, featured_image returns object
      
      const response = await basicProvider.postMethod("cms/files/create", formData);
      if (response?.status === "success" && response?.data?.featured_image?.url) {
        setIconValue(response.data.featured_image.url);
        toast.success("Icon uploaded successfully!");
      } else {
        toast.error("File upload failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while uploading icon.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddLink = () => {
    if (!linkForm.title || !linkForm.url) {
      toast.error("Please enter both Link Name and URL.");
      return;
    }

    if (iconType === "react-icon" && !iconValue) {
      toast.error("Please enter the React Icon name.");
      return;
    }

    if (iconType === "image" && isUploading) {
      toast.error("Please wait for the image to finish uploading.");
      return;
    }

    if (editingItemId) {
      // Update existing item recursively
      const updateItems = (itemList) => {
        return itemList.map((item) => {
          if (item.id === editingItemId) {
            return {
              ...item,
              title: linkForm.title,
              url: linkForm.url,
              description: linkForm.description,
              iconType: iconType,
              iconValue: iconValue,
            };
          }
          if (item.children && item.children.length > 0) {
            return {
              ...item,
              children: updateItems(item.children),
            };
          }
          return item;
        });
      };
      setItems((prev) => updateItems(prev));
      setEditingItemId(null);
    } else {
      const newItem = {
        id: generateId(),
        title: linkForm.title,
        url: linkForm.url,
        description: linkForm.description,
        iconType: iconType,
        iconValue: iconValue,
        children: [],
      };
      
      // Add to the end of the root items
      setItems((prev) => [...prev, newItem]);
    }
    
    // Reset form
    setLinkForm({ title: "", url: "", description: "" });
    setIconType("none");
    setIconValue("");
    setIconFile(null);
  };

  const handleEditItemClick = (item) => {
    setLinkForm({ title: item.title, url: item.url, description: item.description || "" });
    setIconType(item.iconType || "none");
    setIconValue(item.iconValue || "");
    setEditingItemId(item.id);
  };

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Please enter a Navigation Name.");
      return;
    }
    
    if (!slug) {
      toast.error("Please enter a Navigation Slug.");
      return;
    }

    const payload = {
      name,
      slug,
      items,
    };

    let response;
    try {
      if (id) {
        response = await basicProvider.patchMethod(`cms/navigation/update/${id}`, payload);
      } else {
        response = await basicProvider.postMethod("cms/navigation/create", payload);
      }

      if (response.status === "success") {
        toast.success(response.message);
        if (!id && response.data) {
          navigate(`/cms/navigation/edit/${response.data._id}`);
        }
      } else {
        toast.error(response.message || "An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred while saving.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const renderItem = ({ item }) => {
    return (
      <div className="listoffaqsCard cp relative" style={{ marginBottom: "10px", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", border: "1px solid #e2e8f0", borderRadius: "6px", backgroundColor: "#f8fafc", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", flex: 1, minWidth: 0 }}>
          {item.iconType === "image" && item.iconValue && (
            <img src={item.iconValue} alt="icon" style={{ width: "24px", height: "24px", objectFit: "contain", flexShrink: 0, marginTop: "2px" }} />
          )}
          {item.iconType === "react-icon" && item.iconValue && (
            <span style={{ color: "#3182ce", fontWeight: "bold", flexShrink: 0, marginTop: "2px", maxWidth: "80px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.iconValue}>[{item.iconValue}]</span>
          )}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "6px" }}>
              <span style={{ fontWeight: "bold", fontSize: "15px", overflowWrap: "anywhere" }}>{item.title}</span>
              <span style={{ color: "gray", fontSize: "13px", overflowWrap: "anywhere" }}>({item.url})</span>
            </div>
            {item.description && (
              <span style={{ color: "gray", fontSize: "12px", marginTop: "4px", lineHeight: "1.4" }}>{item.description}</span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0, alignItems: "center" }}>
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEditItemClick(item)}
            title="Edit"
          >
            <MdEdit size={20} />
          </button>
          <button
            className="faqremove text-red-500 hover:text-red-700"
            onClick={() => handleDeleteItem(item.id)}
            title="Remove"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
      </div>
    );
  };

  // Helper to recursively remove item
  const handleDeleteItem = (targetId) => {
    const filterItems = (itemList) => {
      return itemList
        .filter((item) => item.id !== targetId)
        .map((item) => ({
          ...item,
          children: item.children ? filterItems(item.children) : [],
        }));
    };
    setItems((prev) => filterItems(prev));
  };

  return (
    <div>
      <div className="faqsPage flex">
        <div className="itemLeft">
          <TableLayoutComp title={"Navigation Details"}>
            <div className="faqsDetailCard cp">
              <div>
                <label htmlFor="name" className="label">
                  Navigation Name <span className="span">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  className="input"
                  placeholder="e.g. Main Header"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{ marginTop: "15px" }}>
                <label htmlFor="slug" className="label">
                  Slug <span className="span">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={slug}
                  className="input"
                  placeholder="e.g. main-header"
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                />
              </div>
            </div>
          </TableLayoutComp>

          <TableLayoutComp title={"Add Custom Link"}>
            <div className="faqsDetailCard cp">
              <div>
                <label htmlFor="linkTitle" className="label">
                  Link Name
                </label>
                <input
                  type="text"
                  id="linkTitle"
                  className="input"
                  placeholder="e.g. Home"
                  value={linkForm.title}
                  onChange={(e) =>
                    setLinkForm({ ...linkForm, title: e.target.value })
                  }
                />
              </div>
              <div style={{ marginTop: "15px" }}>
                <label htmlFor="linkUrl" className="label">
                  URL <span className="span">*</span>
                </label>
                <input
                  type="text"
                  id="linkUrl"
                  className="input"
                  placeholder="e.g. /home"
                  value={linkForm.url}
                  onChange={(e) =>
                    setLinkForm({ ...linkForm, url: e.target.value })
                  }
                />
              </div>
              <div style={{ marginTop: "15px" }}>
                <label htmlFor="linkDescription" className="label">
                  Description
                </label>
                <textarea
                  id="linkDescription"
                  className="input"
                  placeholder="A short description for the link..."
                  rows="2"
                  value={linkForm.description}
                  onChange={(e) =>
                    setLinkForm({ ...linkForm, description: e.target.value })
                  }
                />
              </div>

              <div style={{ marginTop: "15px" }}>
                <label className="label">Icon Type</label>
                <select
                  className="input"
                  value={iconType}
                  onChange={(e) => setIconType(e.target.value)}
                >
                  <option value="none">None</option>
                  <option value="image">Upload Image</option>
                  <option value="react-icon">React Icon</option>
                </select>
              </div>

              {iconType === "react-icon" && (
                <div style={{ marginTop: "15px" }}>
                  <label htmlFor="iconValue" className="label">
                    React Icon Name
                  </label>
                  <input
                    type="text"
                    id="iconValue"
                    className="input"
                    placeholder="e.g. FaHome"
                    value={iconValue}
                    onChange={(e) => setIconValue(e.target.value)}
                  />
                  <small style={{ color: "gray" }}>Make sure this icon is imported in your frontend.</small>
                </div>
              )}

              {iconType === "image" && (
                <div style={{ marginTop: "15px" }}>
                  <label className="label">Upload Icon Image</label>
                  <div className="galleryUpload">
                    <label htmlFor="iconupload">
                      <div className="galleryIcon">
                        <div className="w-full flex justify-center">
                          <MdCloudUpload className="text-4xl text-[#63B2DD]" />
                        </div>
                        <div>{isUploading ? "Uploading..." : "Click or Drag to Upload"}</div>
                      </div>
                    </label>
                    <input
                      type="file"
                      id="iconupload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleIconUpload}
                      disabled={isUploading}
                    />
                  </div>
                  {iconValue && (
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                      <img src={iconValue} alt="Preview" style={{ height: "50px", objectFit: "contain", margin: "0 auto" }} />
                    </div>
                  )}
                </div>
              )}

              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button
                  className="submit"
                  onClick={handleAddLink}
                  disabled={isUploading}
                >
                  {editingItemId ? "Update Link" : "Add Link"}
                </button>
                {editingItemId && (
                  <button
                    className="cancel"
                    onClick={() => {
                      setEditingItemId(null);
                      setLinkForm({ title: "", url: "", description: "" });
                      setIconType("none");
                      setIconValue("");
                      setIconFile(null);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </TableLayoutComp>
        </div>

        <div className="itemRight">
          <TableLayoutComp title={"Adjust Links (Drag & Drop)"}>
            <div className="cp" style={{ minHeight: "300px", maxHeight: "500px", overflowY: "auto", overflowX: "hidden" }}>
              {items.length > 0 ? (
                <Nestable
                  items={items}
                  renderItem={renderItem}
                  onChange={({ items }) => setItems(items)}
                  maxDepth={3}
                />
              ) : (
                <p style={{ color: "gray", textAlign: "center", padding: "40px 0" }}>
                  No links added yet. Add a link from the left panel.
                </p>
              )}
            </div>
          </TableLayoutComp>

          <TableLayoutComp title={"Publish"}>
            <div className="publishCard cp">
              <hr className="horizontalRuler" />
              <div className="flex items-center gap-4">
                <button className="submit" onClick={handleSubmit}>
                  Submit
                </button>
                <button
                  className="cancel"
                  onClick={() => navigate("/cms/navigation/all")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </TableLayoutComp>
        </div>
      </div>
    </div>
  );
}

export default Create;
