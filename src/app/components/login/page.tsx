import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SignUpModal from "../signup/page";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  if (!isOpen) return null;

  const handleSignUpClick = () => {
    setSignUpOpen(true);
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
          <h2 className="text-xl font-semibold mb-4 text-black">ล็อกอิน</h2>
          {/* Add your login form here */}
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">อีเมล</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="กรุณาใส่อีเมล"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">รหัสผ่าน</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="กรุณาใส่รหัสผ่าน"
              />
            </div>
            <p
              className="mb-4 text-black cursor-pointer"
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
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} />
    </>
  );
};

export default Modal;
