"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const Register = () => {
    const [formData, setFormData] = (0, react_1.useState)({
        name: "",
        lastname: "",
        address: "",
        province: "",
        district: "",
        subDistrict: "",
        village: "",
        postalCode: "",
        telephone: "",
        email: "",
        username: "",
        password: "",
        image: "",
    });
    const [isSubmitted, setIsSubmitted] = (0, react_1.useState)(false);
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const response = yield fetch("/api/registers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            sweetalert2_1.default.fire({
                title: "Success!",
                text: "Registration completed successfully!",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                setIsSubmitted(true);
                setTimeout(() => {
                    window.location.href = "/success";
                }, 1500);
            });
        }
        else {
            sweetalert2_1.default.fire({
                title: "Error!",
                text: "Registration failed. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
            console.error("Registration failed.");
        }
    });
    return (<div className="flex items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Lastname" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input type="text" name="province" value={formData.province} onChange={handleChange} placeholder="Province" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
            <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="District" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input type="text" name="subDistrict" value={formData.subDistrict} onChange={handleChange} placeholder="Sub-District" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
            <input type="text" name="village" value={formData.village} onChange={handleChange} placeholder="Village Name" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Telephone" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button type="submit" className="w-full py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Register
          </button>
        </form>
      </div>
    </div>);
};
exports.default = Register;
