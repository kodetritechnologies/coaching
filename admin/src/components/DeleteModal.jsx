import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function DeleteModal({show,setShow}) {
  const handleclose = () => {
    setShow(!show);
  };
  return (
    <div
      className="deleteModal w-[20rem] bg-white flex flex-col items-center justify-center rounded absolute top-50 right-96"
      style={{ display: `${show ? "" : "none"}` }}
    >
      <div
        className="cut w-full flex justify-end  font-bold text-2xl cursor-pointer"
        onClick={handleclose}
      >
        <IoClose />
      </div>
      <div className="icon text-2xl text-red-700">
        <FaTrashAlt />
      </div>
      <h1 className="message font-bold">Are you sure?</h1>
      <p className="font-normal">Do you really want to delete these records?</p>
      <div className="buttons w-full flex items-center justify-center gap-2">
        <button className="bg-blue-400" onClick={handleclose}>
          Cancel
        </button>
        <button className="bg-red-700">Delete</button>
      </div>
    </div>
  );
}

export default DeleteModal;
