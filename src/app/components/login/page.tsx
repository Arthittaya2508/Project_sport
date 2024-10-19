import { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import RegisterModal from "../register/page"; // นำเข้า RegisterModal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  if (!isOpen) return null;

  const handleSignUpClick = () => {
    setRegisterOpen(true);
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
          <h2 className="text-center text-xl font-semibold mb-4 text-cyprus-950">
            ล็อกอิน
          </h2>
          {/* เพิ่มฟอร์มล็อกอิน */}
          <form>
            <div className="mb-4">
              <label className="block text-cyprus-950">อีเมล</label>
              <input
                type="email"
                className="text-cyprus-900 w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="กรุณาใส่อีเมล"
              />
            </div>
            <div className="mb-4">
              <label className="block text-cyprus-950">รหัสผ่าน</label>
              {/* <input
                type="password"
                className="text-cyprus-900 w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="กรุณาใส่รหัสผ่าน"
              /> */}
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"

                  placeholder="Password"
                  className="w-full p-3 border text-cyprus-950 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={()=>setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                >
                  {isPasswordVisible ? (
                    <AiOutlineEye size={24} />
                  ) : (
                    <AiOutlineEyeInvisible size={24} />
                  )}
                </button>
              </div>
            </div>
            <p
              className="mb-4 text-black cursor-pointer text-cyprus-950"
              onClick={handleSignUpClick}
            >
              สมัครสมาชิก
            </p>
            <button
              type="submit"
              className="bg-cyprus-950 text-white px-4 py-2 rounded hover:bg-blue-600"
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
