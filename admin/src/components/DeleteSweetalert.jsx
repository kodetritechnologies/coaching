import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import BasicProvider from "../authentications/BasicProvider";
import { MdDelete, MdOutlineRestore } from "react-icons/md";

function DeleteSweetalert({ title, endpoint, type, deleteID, multiDelete, refresh, restore = false }) {
  const basicProvider = BasicProvider();

  const handeleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      let response = "";

      if (multiDelete) {
        let url = `${endpoint}/${type}`;
        response = await basicProvider.postMethod(
          url,
          JSON.stringify(multiDelete)
        );
      } else {
        const url = `${endpoint}/${type}/${deleteID}`;
        response = await basicProvider.deleteMethod(url);
      }
      Swal.fire({
        title: title || "Deleted!",
        text: response.message,
        icon: response.status,
      });
      refresh();
    }
  };

  return (
    <>
      {restore ? <MdOutlineRestore
        className="text-blue-500 cursor-pointer"
        onClick={handeleDelete}
      /> : <MdDelete
        className="text-red-600 cursor-pointer"
        onClick={handeleDelete}
      />}
    </>
  );
}

export default DeleteSweetalert;
