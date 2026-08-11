import JoditEditor from "jodit-react";
import { useRef } from "react";
export default function JoditTextEditor({ initialValues, setInitialValues }) {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={initialValues}
      onBlur={(newContent) => setInitialValues(newContent)}
    />
  );
}
