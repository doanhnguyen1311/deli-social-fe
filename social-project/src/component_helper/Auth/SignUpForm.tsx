import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { BaseURL } from '../../api';

interface FormData {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  birthday: string;
  gender: string;
  location: string;
  avatarUrl: string;
  avatarFile?: File | null;
}

interface Province {
  id: number;
  code: string;
  name: string;
}

const SignUpForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState('forward');
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    birthday: "",
    gender: "",
    location: "",
    avatarUrl: "",
    avatarFile: null 
  });

  // Fetch provinces
  useEffect(() => {
      const fetchProvinces = async () => {
          try {
              const res = await fetch(`${BaseURL}/provinces`);
              const data = await res.json();
              if (data.success && Array.isArray(data.data)) {
                  setProvinces(data.data);
              }
          } catch (error) {
              console.error("Error fetching provinces:", error);
          }
      };
      fetchProvinces();
  }, []);

  const handleInputChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setDirection('forward');
      setTimeout(() => setCurrentStep(currentStep + 1), 50);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection('backward');
      setTimeout(() => setCurrentStep(currentStep - 1), 50);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Đăng ký thành công!');
  };

  const renderStep = () => {
    const slideClass = direction === 'forward' 
      ? 'animate-slideInRight' 
      : 'animate-slideInLeft';

    switch (currentStep) {
      case 1:
        return (
          <div key="step1" className={slideClass}>
            <h2 className="fs-24 font-bold text-color mb-24">Thông Tin Đăng Nhập</h2>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="User Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
          </div>
        );

      case 2:
        return (
          <div key="step2" className={slideClass}>
            <h2 className="fs-24 font-bold text-color mb-24">Thông Tin Cá Nhân</h2>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
          </div>
        );

      case 3:
        return (
          <div key="step3" className={slideClass}>
            <h2 className="fs-24 font-bold text-color mb-24">Thông Tin Bổ Sung</h2>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-100 mt-8 mb-8 border radius-8 transition"
              style={{backgroundColor: '#eee', padding: '10px 15px', color: '#626276'}}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            <select
              className="w-100 fs-13 h-40 bg-gray-500 my-8 px-16 py-6 lh-16 text-color radius-8 cursor-pointer border-none"
              style={{backgroundColor: '#eee', padding: '10px 15px', color: '#626276'}}
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="">Thành phố, Quốc gia</option>
              {provinces.map(province => (
                <option key={province.id} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
        );

      case 4:
        return (
          <div key="step4" className={`${slideClass} file-input-wrapper`}>
            <h2 className="fs-24 font-bold text-color mb-24">Ảnh Đại Diện</h2>
            <label htmlFor="avatar-upload" className="file-input-label">
              Chọn ảnh đại diện
            </label>
            <div className="mb-6">
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="file-input-hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData(prev => ({
                        ...prev,
                        avatarUrl: reader.result as string,
                        avatarFile: file
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            
            {formData.avatarUrl ? (
              <div className="d-flex justify-center mb-6">
                <img
                  src={formData.avatarUrl}
                  alt="Preview"
                  className="w-120 h-120 radius-50 object-cover border-4 border-blue-500"
                />
              </div>
            ) : (
              <div className="d-flex justify-center mb-6">
                <div
                  className="w-120 h-120 radius-50 object-cover border-4 border-blue-500 bg-gray-500"
                />
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-container sign-up">
      <form className="bg-white w-100 justify-start py-32">
        {/* Progress Bar */}
        <div className="mb-24 w-100">
          <div className="d-flex justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-25per h-4 radius-24 mx-1 transition-all duration-300 ${
                  step <= currentStep ? 'bg-gradient-purple' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="overflow-hidden">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="w-100 d-flex justify-between align-center mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`d-flex align-center px-32 fw-semibold transition`}
          >
            <ChevronLeft size={16} />
            Quay lại
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="d-flex align-center px-32 fw-semibold transition"
            >
              Tiếp theo
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="d-flex align-center px-32 fw-semibold transition"
            >
              Hoàn tất
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
