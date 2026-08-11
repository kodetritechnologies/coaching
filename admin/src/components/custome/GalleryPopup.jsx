import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

function GalleryPopup({ open, setOpen, item, setInitialValues }) {
  const [form, setForm] = useState({ name: "", desc: "", link: "" });

  useEffect(() => {
    if (item) {
      setForm({ name: item.name, desc: item.desc, link: item.link });
    }
  }, [item]);

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = "";
    document.getElementById("galleryPage").style.opacity = "1.0";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = () => {
    setInitialValues((pre) => {
      const updatedGallery = pre.gallery.map((g) =>
        g._id === item._id ? { ...g, ...form } : g
      );
      return { ...pre, gallery: updatedGallery };
    });
    handleClose();
  };

  return (
    <div
      className="galleryPopup"
      style={{ display: `${open ? "block" : "none"}` }}
    >
      <div className="flex justify-end">
        <RxCross2
          className="font-bold text-2xl cursor-pointer"
          onClick={handleClose}
        />
      </div>

      <div>
        <label className="label float-start">Name</label>
        <input
          name="name"
          value={form.name}
          className="input"
          onChange={handleChange}
          placeholder="Enter Name"
        />
      </div>

      <div>
        <label className="label float-start">Description</label>
        <input
          name="desc"
          value={form.desc}
          className="input"
          onChange={handleChange}
          placeholder="Enter Description"
        />
      </div>

      <div>
        <label className="label float-start">Link</label>
        <input
          name="link"
          value={form.link}
          className="input"
          onChange={handleChange}
          placeholder="Enter Link"
        />
      </div>

      <div className="cp flex gap-4 justify-center items-center">
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button className="cancel" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default GalleryPopup;
