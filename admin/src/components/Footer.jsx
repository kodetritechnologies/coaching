import { currentYear } from "../helpers/dateHelper";

function Footer() {
  return (
    <div className="w-full h-16 flex items-center bg-[#EBEDEF] shadow-2xl">
      <p className="text-gray-800 cml">
        © {currentYear()} All rights reserved by Kodetri Technologies Pvt Ltd.
      </p>
    </div>
  );
}

export default Footer;
