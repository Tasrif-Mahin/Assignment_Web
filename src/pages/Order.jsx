import { useState } from "react";
import { Link } from "react-router-dom";

const Order = () => {
  const [formData, setFormData] = useState({
    serviceType: "writing",
    email: "",
    countryCode: "BD +880",
    phone: "",
    subject: "",
    description: "",
    deadline: "",
    pages: 1,
    acceptTerms: false,
  });

  const countryCodes = [
  { code: "US +1", name: "United States" },
  { code: "GB +44", name: "United Kingdom" },
  { code: "CA +1", name: "Canada" },
  { code: "AU +61", name: "Australia" },
  { code: "NZ +64", name: "New Zealand" },
  { code: "IE +353", name: "Ireland" },
  { code: "SG +65", name: "Singapore" },
  { code: "AE +971", name: "United Arab Emirates" },
  { code: "SA +966", name: "Saudi Arabia" },
  { code: "QA +974", name: "Qatar" },
  { code: "IN +91", name: "India" },
  { code: "PK +92", name: "Pakistan" },
  { code: "BD +880", name: "Bangladesh" },
  { code: "LK +94", name: "Sri Lanka" },
  { code: "NP +977", name: "Nepal" },
  { code: "MY +60", name: "Malaysia" },
  { code: "PH +63", name: "Philippines" },
  { code: "ID +62", name: "Indonesia" },
  { code: "TH +66", name: "Thailand" },
  { code: "VN +84", name: "Vietnam" },
  { code: "CN +86", name: "China" },
  { code: "JP +81", name: "Japan" },
  { code: "KR +82", name: "South Korea" },
  { code: "HK +852", name: "Hong Kong" },
  { code: "TW +886", name: "Taiwan" },
  { code: "ZA +27", name: "South Africa" },
  { code: "NG +234", name: "Nigeria" },
  { code: "KE +254", name: "Kenya" },
  { code: "EG +20", name: "Egypt" },
  { code: "GH +233", name: "Ghana" },
  { code: "DE +49", name: "Germany" },
  { code: "FR +33", name: "France" },
  { code: "IT +39", name: "Italy" },
  { code: "ES +34", name: "Spain" },
  { code: "NL +31", name: "Netherlands" },
  { code: "BE +32", name: "Belgium" },
  { code: "CH +41", name: "Switzerland" },
  { code: "AT +43", name: "Austria" },
  { code: "SE +46", name: "Sweden" },
  { code: "NO +47", name: "Norway" },
  { code: "DK +45", name: "Denmark" },
  { code: "FI +358", name: "Finland" },
  { code: "PL +48", name: "Poland" },
  { code: "RU +7", name: "Russia" },
  { code: "UA +380", name: "Ukraine" },
  { code: "TR +90", name: "Turkey" },
  { code: "GR +30", name: "Greece" },
  { code: "PT +351", name: "Portugal" },
  { code: "CZ +420", name: "Czech Republic" },
  { code: "RO +40", name: "Romania" },
  { code: "BR +55", name: "Brazil" },
  { code: "MX +52", name: "Mexico" },
  { code: "AR +54", name: "Argentina" },
  { code: "CL +56", name: "Chile" },
  { code: "CO +57", name: "Colombia" },
  { code: "PE +51", name: "Peru" },
  { code: "IL +972", name: "Israel" },
  { code: "JO +962", name: "Jordan" },
  { code: "LB +961", name: "Lebanon" },
  { code: "OM +968", name: "Oman" },
  { code: "KW +965", name: "Kuwait" },
  { code: "BH +973", name: "Bahrain" },
];


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Form Data:", formData);
    alert("Order submitted successfully!");
  };

  const incrementPages = () => {
    setFormData({ ...formData, pages: formData.pages + 1 });
  };

  const decrementPages = () => {
    if (formData.pages > 1) {
      setFormData({ ...formData, pages: formData.pages - 1 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-6 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-1 mb-3">
            Get Instant Help From <span className="text-blue-4">5000+</span> Experts For
          </h1>
          <p className="text-navy-3 text-lg">Assignment, Essay, Homework & More</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-4/30 overflow-hidden">
          {/* Service Type Tabs */}
          <div className="flex bg-white-6 border-b-2 border-blue-4/20">
            <button
              onClick={() => setFormData({ ...formData, serviceType: "writing" })}
              className={`flex-1 py-4 font-semibold text-sm md:text-base transition ${
                formData.serviceType === "writing"
                  ? "bg-blue-4 text-white shadow-md"
                  : "text-navy-3 hover:text-navy-1 hover:bg-white"
              }`}
            >
              Writing
            </button>
            <button
              onClick={() => setFormData({ ...formData, serviceType: "rewriting" })}
              className={`flex-1 py-4 font-semibold text-sm md:text-base transition ${
                formData.serviceType === "rewriting"
                  ? "bg-blue-4 text-white shadow-md"
                  : "text-navy-3 hover:text-navy-1 hover:bg-white"
              }`}
            >
              Rewriting
            </button>
            <button
              onClick={() => setFormData({ ...formData, serviceType: "editing" })}
              className={`flex-1 py-4 font-semibold text-sm md:text-base transition ${
                formData.serviceType === "editing"
                  ? "bg-blue-4 text-white shadow-md"
                  : "text-navy-3 hover:text-navy-1 hover:bg-white"
              }`}
            >
              Editing
            </button>
            <button
              onClick={() => setFormData({ ...formData, serviceType: "other" })}
              className={`flex-1 py-4 font-semibold text-sm md:text-base transition ${
                formData.serviceType === "other"
                  ? "bg-blue-4 text-white shadow-md"
                  : "text-navy-3 hover:text-navy-1 hover:bg-white"
              }`}
            >
              Other
            </button>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-navy-1 mb-2">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email for communication"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                      required
                    />
                    <span className="absolute right-3 top-3.5 text-navy-3 cursor-help">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-navy-1 mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-32 px-3 py-3 border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 text-sm font-mono"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                    />
                  </div>
                </div>

                {/* Subject/Course Code */}
                <div>
                  <label className="block text-sm font-semibold text-navy-1 mb-2">
                    Subject/CourseCode
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Eg. UNCC100 Self & Community"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-semibold text-navy-1 mb-2">
                    Deadline <span className="text-xs text-navy-3">(4 days 20 hours left)</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                  />
                </div>

                {/* No. of Pages */}
                <div>
                  <label className="block text-sm font-semibold text-navy-1 mb-2">
                    No. of pages{" "}
                    <span className="text-xs text-navy-3">(1 page = 250 words)</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={decrementPages}
                      className="w-10 h-10 bg-navy-3/20 text-navy-1 rounded-lg font-bold hover:bg-navy-3/30 transition"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      name="pages"
                      value={formData.pages}
                      onChange={handleChange}
                      className="w-20 px-4 py-3 text-center border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                      min="1"
                    />
                    <button
                      type="button"
                      onClick={incrementPages}
                      className="w-10 h-10 bg-navy-3/20 text-navy-1 rounded-lg font-bold hover:bg-navy-3/30 transition"
                    >
                      +
                    </button>
                    <span className="text-sm text-navy-3">
                      {formData.pages * 250} Words
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-navy-1 mb-2">
                    Enter Your Assignment Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Write assignment description"
                    rows="8"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 resize-none transition"
                  ></textarea>
                </div>

                {/* File Upload */}
                <div>
                  <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-blue-4 rounded-lg hover:bg-blue-5/10 cursor-pointer transition text-sm">
                    <svg
                      className="w-5 h-5 text-blue-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                    <span className="text-navy-1 font-semibold">Add Files</span>
                    <input type="file" className="hidden" multiple />
                  </label>
                </div>

                {/* Coupon Code */}
                <div>
                  <Link
                    to="/coupons"
                    className="text-sm text-blue-4 hover:underline font-medium"
                  >
                    Have a coupon code?
                  </Link>
                </div>

                {/* Live Experts */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-navy-1 font-semibold">
                    178 live experts available now!
                  </span>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-blue-4 rounded border-navy-3 focus:ring-blue-4"
                  />
                  <label className="text-xs text-navy-3">
                    I accept the T&C and other policies of the website and agree to receive
                    offers and updates.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-4 to-blue-5 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-sm text-navy-3">
          <p>
            Need help?{" "}
            <Link to="/contact" className="text-blue-4 hover:underline font-semibold">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
