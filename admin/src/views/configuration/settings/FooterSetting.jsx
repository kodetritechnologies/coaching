import {
  FaFacebookSquare,
  FaLinkedin,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import SummernoteEditor from "../../../components/textEditor/SummernoteEditor";
import { useEffect, useState } from "react";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import BasicProvider from "../../../authentications/BasicProvider";
import toast from "react-hot-toast";
import JoditTextEditor from "../../../components/textEditor/JoditTextEditor";

function FooterSetting() {
  const basicProvider = BasicProvider();
  const [address, setAddress] = useState({
    address: "",
    email: "",
    mobile: "",
    time: "",
    description: "",
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    x: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    telegram: "",
  });

  const [quickLinks, setQuickLinks] = useState({
    content: "",
  });

  const [quickNavigation, setQuickNavigation] = useState({
    content: "",
  });

  const [campusCenters, setCampusCenters] = useState({
    content: "",
  });

  const [aboutInstitute, setAboutInstitute] = useState({
    content: "",
  });

  const fetchAddressData = async (type) => {
    try {
      const response = await basicProvider.getMethod(
        `configuration/footer/type/${type}`,
      );
      if (response.status === "success") {
        setAddress(response?.data?.value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSocialData = async (type) => {
    try {
      const response = await basicProvider.getMethod(
        `configuration/footer/type/${type}`,
      );
      if (response.status === "success") {
        setSocialLinks(response?.data?.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQucikLinksdata = async (type) => {
    try {
      const response = await basicProvider.getMethod(
        `configuration/footer/type/${type}`,
      );
      if (response.status === "success") {
        setQuickLinks((pre) => ({
          ...pre,
          content: response?.data?.value?.content,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuickNavigationData = async (type) => {
    try {
      const response = await basicProvider.getMethod(
        `configuration/footer/type/${type}`,
      );
      if (response.status === "success") {
        setQuickNavigation(response?.data?.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCampusCentersData = async (type) => {
    try {
      const response = await basicProvider.getMethod(
        `configuration/footer/type/${type}`,
      );
      if (response.status === "success") {
        setCampusCenters(response?.data?.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAboutInstituteData = async (type) => {
    try {
      const response = await basicProvider.getMethod(
        `configuration/footer/type/${type}`,
      );
      if (response.status === "success") {
        setAboutInstitute(response?.data?.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((pre) => ({ ...pre, [name]: value }));
  };

  const handleSocialLinksChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (payload, type) => {
    const data = handleSubmitHelper({ type, value: payload });
    if (data) {
      const response = await basicProvider.postMethod(
        `configuration/footer/create`,
        data,
      );

      if (response.status === "success") {
        toast.success(response.message);
        fetchAddressData("address");
        fetchSocialData("social_links");
        fetchQucikLinksdata("quick_links");
        fetchQuickNavigationData("quick_navigation");
        fetchCampusCentersData("campus_centers");
        fetchAboutInstituteData("about_institute");
      } else {
        toast.error("something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchAddressData("address");
    fetchSocialData("social_links");
    fetchQucikLinksdata("quick_links");
    fetchQuickNavigationData("quick_navigation");
    fetchCampusCentersData("campus_centers");
    fetchAboutInstituteData("about_institute");
  }, []);
  return (
    <div>
      <div className="footerPage cp">
        <TableLayoutComp title={"Address Details"}>
          <div className="addresscard cp">
            <div>
              <label htmlFor="address" className="label">
                Address
              </label>
              <textarea
                name="address"
                value={address?.address}
                id="address"
                className="input"
                style={{ minHeight: "4rem" }}
                onChange={handleAddressChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="address" className="label">
                Email Address
              </label>
              <input
                name="email"
                value={address?.email}
                id="email"
                className="input"
                placeholder="Enter your email"
                onChange={handleAddressChange}
              ></input>
            </div>
            <div>
              <label htmlFor="mobile" className="label">
                Mobile
              </label>
              <input
                name="mobile"
                value={address?.mobile}
                id="mobile"
                className="input"
                placeholder="Enter your mobile number"
                onChange={handleAddressChange}
              ></input>
            </div>
            <div>
              <label htmlFor="time" className="label">
                Time schedule
              </label>
              <input
                name="time"
                value={address?.time}
                id="time"
                className="input"
                onChange={handleAddressChange}
              ></input>
            </div>
            <div>
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                name="description"
                value={address?.description}
                id="description"
                className="input"
                style={{ minHeight: "4rem" }}
                onChange={handleAddressChange}
              ></textarea>
            </div>
            <div>
              <button
                className="submit cmt"
                onClick={() => handleSubmit(address, "address")}
              >
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
        <TableLayoutComp title={"Social Media Icons"}>
          <div className="socialLinksCard cp flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <FaFacebookSquare className="text-4xl" />{" "}
              <input
                type="facebook"
                value={socialLinks?.facebook}
                className="input"
                name="facebook"
                placeholder="Enter facebook url"
                onChange={handleSocialLinksChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <FaSquareXTwitter className="text-4xl" />{" "}
              <input
                type="twitter"
                value={socialLinks?.twitter}
                name="twitter"
                className="input"
                placeholder="Enter twitter url"
                onChange={handleSocialLinksChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <FaLinkedin className="text-4xl" />{" "}
              <input
                type="linkedin"
                value={socialLinks?.linkedin}
                className="input"
                name="linkedin"
                placeholder="Enter linkedin url"
                onChange={handleSocialLinksChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <FaSquareInstagram className="text-4xl" />{" "}
              <input
                type="instagram"
                value={socialLinks?.instagram}
                className="input"
                name="instagram"
                placeholder="Enter instagram url"
                onChange={handleSocialLinksChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <FaYoutube className="text-4xl" />{" "}
              <input
                type="youtube"
                value={socialLinks?.youtube}
                className="input"
                name="youtube"
                placeholder="Enter youtube url"
                onChange={handleSocialLinksChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <FaTelegram className="text-4xl" />{" "}
              <input
                type="telegram"
                value={socialLinks?.telegram}
                className="input"
                name="telegram"
                placeholder="Enter telegram url"
                onChange={handleSocialLinksChange}
              />
            </div>
            <div className="cmt">
              <button
                className="submit"
                onClick={() => handleSubmit(socialLinks, "social_links")}
              >
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
        <TableLayoutComp title={"Quick Links"}>
          <div className="quickLinkCard cp">
            <div>
              <JoditTextEditor
                initialValues={quickLinks?.content}
                setInitialValues={(value) => {
                  setQuickLinks((pre) => ({
                    ...pre,
                    content: value,
                  }));
                }}
              />
            </div>
            <div className="cmt">
              <button
                className="submit"
                onClick={() => handleSubmit(quickLinks, "quick_links")}
              >
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
        <TableLayoutComp title={"Quick Navigation"}>
          <div className="supportCard cp">
            <div>
              <JoditTextEditor
                initialValues={quickNavigation?.content}
                setInitialValues={(value) => {
                  setQuickNavigation((pre) => ({
                    ...pre,
                    content: value,
                  }));
                }}
              />
            </div>
            <div className="cmt">
              <button
                className="submit"
                onClick={() => handleSubmit(quickNavigation, "quick_navigation")}
              >
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
        <TableLayoutComp title={"Campus Centers"}>
          <div className="supportCard cp">
            <div>
              <JoditTextEditor
                initialValues={campusCenters?.content}
                setInitialValues={(value) => {
                  setCampusCenters({ ...campusCenters, content: value });
                }}
              />
            </div>
            <div className="cmt">
              <button
                className="submit"
                onClick={() => handleSubmit(campusCenters, "campus_centers")}
              >
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
        <TableLayoutComp title={"About Institute"}>
          <div className="supportCard cp">
            <div>
              <JoditTextEditor
                initialValues={aboutInstitute?.content}
                setInitialValues={(value) => {
                  setAboutInstitute({ ...aboutInstitute, content: value });
                }}
              />
            </div>
            <div className="cmt">
              <button
                className="submit"
                onClick={() => handleSubmit(aboutInstitute, "about_institute")}
              >
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
      </div>
    </div>
  );
}

export default FooterSetting;
