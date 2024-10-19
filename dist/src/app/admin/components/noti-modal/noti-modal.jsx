"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const NotificationModal = ({ isOpen, onClose, notifications, }) => {
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-80">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        <ul>
          {notifications.length > 0 ? (notifications.map((notification, index) => (<li key={index} className="mb-2">
                {notification}
              </li>))) : (<li>No new notifications</li>)}
        </ul>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
          Close
        </button>
      </div>
    </div>);
};
exports.default = NotificationModal;
