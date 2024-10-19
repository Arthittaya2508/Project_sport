import { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import RegisterModal from "../register/page"; // Import RegisterModal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false); // State for password visibility

  if (!isOpen) return null;

  const handleSignUpClick = () => {
    setRegisterOpen(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <AiOutlineClose size={24} />
          </button>
          <h2 className="text-2xl font-semibold mb-4 text-cyprus-950 text-center">
            ล็อกอิน
          </h2>
          {/* Login Form */}
          <form>
            <div className="mb-4">
              <label className="block text-cyprus-950 font-semibold">
                อีเมล
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border text-gray-500 rounded"
                placeholder="กรุณาใส่อีเมล"
              />
            </div>
            <div className="mb-4 relative">
              {" "}
              {/* Add relative positioning */}
              <label className="block text-cyprus-950 font-semibold">
                รหัสผ่าน
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"} // Change input type based on visibility
                className="w-full px-3 py-2 border text-gray-600 rounded"
                placeholder="กรุณาใส่รหัสผ่าน"
              />
              <button
                type="button" // Make it a button to prevent form submission
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              >
                {isPasswordVisible ? (
                  <AiOutlineEye size={24} className="mt-5" />
                ) : (
                  <AiOutlineEyeInvisible size={24} className="mt-5" />
                )}
              </button>
            </div>
            <p
              className="mb-4 text-cyprus-950 cursor-pointer font-semibold"
              onClick={handleSignUpClick}
            >
              สมัครสมาชิก
            </p>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ล็อกอิน
            </button>
          </form>
        </div>
      </div>
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </>
  );
};

export default LoginModal;
