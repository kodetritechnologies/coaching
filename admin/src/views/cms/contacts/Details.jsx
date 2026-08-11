import { useEffect, useState } from "react";
import BasicProvider from "../../../authentications/BasicProvider";
import { useParams } from "react-router-dom";
import { getDateTime } from "../../../helpers/dateHelper";

function Details() {
  const basicProvider = BasicProvider();
  const params = useParams();
  const [data, setData] = useState({});
  const { id } = params;
  const [coursesMap, setCoursesMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await basicProvider.getMethod(`cms/contact/by/${id}`);
      if (response.status === "success") {
        setData(response.data);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await basicProvider.getMethod("configuration/categories/byType/course");
        if (response.status === "success" && response.data) {
          const map = {};
          response.data.forEach((c) => {
            map[c._id] = c.name;
          });
          setCoursesMap(map);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    fetchCourses();
  }, []);
  return (
    <div className="contactDetailPage">
      <div className="contactLeft">
        <div className="contactCard">
          <div className="imgSection">
            <img
              style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              src={data?.customer?.featured_image?.url || "/user.png"}
              alt="not found"
            />
            <span>{data?.customer?.name || data?.values?.values?.name || data.values?.name}</span>
            <span>{data?.customer?.phone || data?.values?.values?.phone || data.values?.phone}</span>
          </div>
          <hr className="horizontalRuler" />
          <div className="contactDetails">
            {data?.values &&
              Object?.entries(data.values?.values || data.values)
                ?.filter(([key]) => key !== "message")
                ?.map(([key, value]) => (
                  <div className="flex gap-2 items-center" key={key}>
                    <label htmlFor="" className="label font-bold">
                      {key} :
                    </label>
                    <span>{key === "course" ? (coursesMap[value] || value) : typeof value === 'object' ? JSON.stringify(value) : value}</span>
                  </div>
                ))}
            {(data?.values?.values?.message || data?.values?.message) && (
              <div>
                <label htmlFor="" className="label">
                  Message
                </label>
                <textarea name="" className="input" readOnly id="">
                  {data?.values?.values?.message || data?.values?.message}
                </textarea>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="contactRight">
        <div>
          <h4 className="text-center font-bold">Submission Info</h4>
        </div>
        <div className="cmt">
          <div>
            <span className="font-bold text-sm">Date :</span>{" "}
            <span>{getDateTime(data?.createdAt)}</span>
          </div>
          <div>
            <span className="font-bold text-sm">Customer Id :</span>{" "}
            <span>{id}</span>
          </div>
          <div>
            <img src="/contactDetails.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
