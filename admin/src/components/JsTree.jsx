import { useEffect, useRef } from "react";
import $ from "jquery";
import "jstree";
import "jstree/dist/themes/default/style.css";

import toast from "react-hot-toast";
import BasicProvider from "../authentications/BasicProvider";
import { useNavigate } from "react-router-dom";

export default function JsTree({ data, fetchData,endpoint,navigates }) {
  const treeRef = useRef(null);
  const basicProvider = BasicProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data || data.length === 0) return;

    $(treeRef.current).jstree("destroy").empty();

    const formatData = (categories) =>
      categories.map((cat) => ({
        id: cat._id,
        text: `${cat.name} <span class="delete-icon" data-id="${cat._id}">🗑️</span>`,
        children: formatData(cat.children || []),
      }));

    $(treeRef.current).jstree({
      core: {
        check_callback: true,
        data: formatData(data),
      },
    });

    $(treeRef.current).on("select_node.jstree", (e, data) => {
      const categoryId = data.node.id;
      navigate(`${navigates}/${categoryId}/edit`);
    });


    $(treeRef.current).on("click", ".delete-icon", async function (e) {
      e.stopPropagation();
      const id = $(this).data("id");

      try {
        const response = await basicProvider.deleteMethod(
          `${endpoint}/delete/${id}`
        );
        if (response.status === "success") {
          toast.success(response.message);
          fetchData();
        } else {
          toast.error(response.message || "Delete failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    });
  }, [data, fetchData, navigate]);

  return <div className="cp" ref={treeRef}></div>;
}
