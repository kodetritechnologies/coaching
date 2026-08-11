import { useEffect, useRef } from "react";
import $ from "jquery";
import "jstree";
import "jstree/dist/themes/default/style.css";

export default function JsTreeCheckbox({ data, onCheck, defaultChecked = [] }) {
  const treeRef = useRef(null);
  defaultChecked = defaultChecked?.map((cat) => cat._id);

  useEffect(() => {
    if (!data || data.length === 0) return;

    $(treeRef.current).jstree("destroy").empty();

    const formatData = (categories) =>
      categories.map((cat) => ({
        id: cat._id,
        text: cat.name,
        state: {
          checked: defaultChecked.includes(cat?._id),
        },
        children:
          cat.children && cat.children.length > 0
            ? formatData(cat.children)
            : [],
      }));

    $(treeRef.current).jstree({
      core: {
        check_callback: true,
        data: formatData(data),
      },
      plugins: ["checkbox"],
      checkbox: {
        three_state: true,
        tie_selection: false,
      },
    });

    $(treeRef.current).on("check_node.jstree uncheck_node.jstree", function () {
      if (onCheck) {
        const checkedNodes = $(treeRef.current)
          .jstree("get_checked", true)
          .map((node) => node);
        onCheck(checkedNodes);
      }
    });

    $(treeRef.current).on("ready.jstree", function () {
      if (onCheck) {
        const checkedNodes = $(treeRef.current)
          .jstree("get_checked", true)
          .map((node) => node);
        onCheck(checkedNodes);
      }
    });
  }, [data]);

  return <div className="cp" ref={treeRef}></div>;
}
