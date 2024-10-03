import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
      <FaSpinner className="w-12 h-12 text-blue-500 animate-spin" />
    </div>
  );
};

export default Loading;
