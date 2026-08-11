import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function SummernoteEditor({ initialValues, setInitialValues }) {
  return (
    <ReactQuill
      theme="snow"
      value={initialValues}
      onChange={(data) => {
        setInitialValues((pre) => ({ ...pre, content: data }));
      }}
    />
  );
}

export default SummernoteEditor;
