import { BookOpen, Calendar, Mail, Phone, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Input, Loader } from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { useNotification } from "../../../context/NotificationContext";
import { studentService } from "../../../services/studentService";

/**
 * Edit Profile Page
 * Edit student personal information and profile details
 */
function EditProfile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    guardianName: "",
    guardianPhone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const { success: showSuccess, error: showError } = useNotification();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await studentService.getProfile();
      const profileData = response.data || {};

      setProfile(profileData);
      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        address: profileData.address || "",
        dateOfBirth: profileData.dateOfBirth
          ? new Date(profileData.dateOfBirth).toISOString().split("T")[0]
          : "",
        guardianName: profileData.guardianName || "",
        guardianPhone: profileData.guardianPhone || "",
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load profile";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Phone validation (10 digits)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      setError("Phone number must be 10 digits");
      return;
    }

    if (formData.guardianPhone && !/^\d{10}$/.test(formData.guardianPhone)) {
      setError("Guardian phone number must be 10 digits");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // This endpoint needs to be implemented in studentService
      await studentService.updateProfile?.(formData);

      showSuccess("Profile updated successfully");
      fetchProfile(); // Reload profile
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to update profile";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        dateOfBirth: profile.dateOfBirth
          ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
          : "",
        guardianName: profile.guardianName || "",
        guardianPhone: profile.guardianPhone || "",
      });
    }
    setError(null);
  };

  if (loading) {
    return (
      <DashboardLayout title="Edit Profile">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Edit Profile"
      subtitle="Update your personal information"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
        <p className="text-gray-600 mt-1">Keep your information up to date</p>
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}

      {/* Profile Form */}
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <Card className="mb-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <User className="h-5 w-5 mr-2 text-primary-500" />
                Personal Information
              </h3>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name <span className="text-error-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email <span className="text-error-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    icon={<Mail className="h-5 w-5" />}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                    icon={<Phone className="h-5 w-5" />}
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date of Birth
                </label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  icon={<Calendar className="h-5 w-5" />}
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
            </div>
          </Card>

          {/* Guardian Information */}
          <Card className="mb-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary-500" />
                Guardian Information
              </h3>
            </div>

            <div className="space-y-4">
              {/* Guardian Name and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="guardianName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Guardian Name
                  </label>
                  <Input
                    id="guardianName"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    placeholder="Enter guardian's name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guardianPhone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Guardian Phone
                  </label>
                  <Input
                    id="guardianPhone"
                    name="guardianPhone"
                    type="tel"
                    value={formData.guardianPhone}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                    icon={<Phone className="h-5 w-5" />}
                    maxLength={10}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Read-Only Information */}
          {profile && (
            <Card className="mb-6 bg-gray-50">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Student Information (Read-only)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {profile.rollNumber && (
                  <div>
                    <p className="text-gray-600">Roll Number</p>
                    <p className="font-medium text-gray-800">
                      {profile.rollNumber}
                    </p>
                  </div>
                )}

                {profile.class && (
                  <div>
                    <p className="text-gray-600">Class</p>
                    <p className="font-medium text-gray-800">{profile.class}</p>
                  </div>
                )}

                {profile.admissionDate && (
                  <div>
                    <p className="text-gray-600">Admission Date</p>
                    <p className="font-medium text-gray-800">
                      {new Date(profile.admissionDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-4">
                * Contact administration to update roll number, class, or
                admission details
              </p>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={saving}
              icon={<Save className="h-4 w-4" />}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={saving}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default EditProfile;
