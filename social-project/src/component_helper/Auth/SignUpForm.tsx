import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Image } from 'lucide-react';

const SignUpForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState('forward');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    birthday: '',
    gender: '',
    location: '',
    avatarUrl: ''
  });

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
            
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Thành phố, Quốc gia"
            />
          </div>
        );

      case 4:
        return (
          <div key="step4" className={slideClass}>
            <h2 className="fs-24 font-bold text-color mb-24">Ảnh Đại Diện</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                <Image className="inline w-4 h-4 mr-2" />
                URL ảnh đại diện
              </label>
              <input
                type="url"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {formData.avatarUrl && (
              <div className="flex justify-center mb-6">
                <img
                  src={formData.avatarUrl}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
              <p className="font-semibold mb-2">Xem lại thông tin:</p>
              <p><strong>Tên đăng nhập:</strong> {formData.username}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Họ tên:</strong> {formData.fullName}</p>
              <p><strong>Số điện thoại:</strong> {formData.phoneNumber}</p>
            </div>
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
            className={`d-flex align-center px-32 rounded-lg font-semibold transition ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            <ChevronLeft size={16} />
            Quay lại
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="d-flex align-center px-32 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Tiếp theo
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="d-flex align-center px-32 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Hoàn tất
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
