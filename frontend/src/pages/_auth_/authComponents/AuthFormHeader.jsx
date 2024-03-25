import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { BsHouseLockFill } from "react-icons/bs";

AuthFormHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  linkName: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
};

export default function AuthFormHeader({ heading, paragraph, linkName, linkUrl }) {
  return (
    <>
      <BsHouseLockFill className="w-12 h-12 text-purple-600 " />

      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{heading}</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {paragraph}
        <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
          {linkName}
        </Link>
      </p>
    </>
  );
}
