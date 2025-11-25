import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle,
  Mail,
  MessageSquare,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Loader } from "../../../components/common";
import { DashboardLayout } from "../../../components/layout";
import { useNotification } from "../../../context/NotificationContext";
import { studentService } from "../../../services/studentService";

/**
 * Notification Settings Page
 * Manage notification preferences for different types of alerts
 */
function NotificationSettings() {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    emailNotifications: {
      enabled: true,
      courses: true,
      attendance: true,
      results: true,
      library: true,
      announcements: true,
    },
    smsNotifications: {
      enabled: false,
      attendance: false,
      results: false,
      library: false,
      important: true,
    },
    pushNotifications: {
      enabled: true,
      courses: true,
      attendance: true,
      results: true,
      library: true,
      announcements: true,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const { success: showSuccess, error: showError } = useNotification();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);

      // This endpoint needs to be implemented in studentService
      const response = (await studentService.getNotificationSettings?.()) || {
        data: {},
      };
      const settingsData = response.data || {};

      setSettings(settingsData);
      if (Object.keys(settingsData).length > 0) {
        setFormData({
          emailNotifications:
            settingsData.emailNotifications || formData.emailNotifications,
          smsNotifications:
            settingsData.smsNotifications || formData.smsNotifications,
          pushNotifications:
            settingsData.pushNotifications || formData.pushNotifications,
        });
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to load notification settings";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (category, field) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field],
      },
    }));
  };

  const handleMasterToggle = (category) => {
    const newValue = !formData[category].enabled;
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        enabled: newValue,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);

      // This endpoint needs to be implemented in studentService
      await studentService.updateNotificationSettings?.(formData);

      showSuccess("Notification settings updated successfully");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to update notification settings";
      setError(errorMsg);
      showError(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (settings) {
      setFormData({
        emailNotifications:
          settings.emailNotifications || formData.emailNotifications,
        smsNotifications:
          settings.smsNotifications || formData.smsNotifications,
        pushNotifications:
          settings.pushNotifications || formData.pushNotifications,
      });
    }
    setError(null);
  };

  if (loading) {
    return (
      <DashboardLayout title="Notification Settings">
        <Loader fullScreen />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Notification Settings"
      subtitle="Manage how you receive notifications"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Notification Preferences
        </h2>
        <p className="text-gray-600 mt-1">
          Choose how you want to be notified about important updates
        </p>
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}

      {/* Settings Form */}
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit}>
          {/* Email Notifications */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-primary-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-600">
                    Receive updates via email
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.emailNotifications.enabled}
                  onChange={() => handleMasterToggle("emailNotifications")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            {formData.emailNotifications.enabled && (
              <div className="space-y-3 pl-9">
                {[
                  {
                    key: "courses",
                    label: "Course updates and assignments",
                    icon: Calendar,
                  },
                  {
                    key: "attendance",
                    label: "Attendance alerts",
                    icon: CheckCircle,
                  },
                  {
                    key: "results",
                    label: "Exam results published",
                    icon: AlertCircle,
                  },
                  {
                    key: "library",
                    label: "Library due dates and fines",
                    icon: Bell,
                  },
                  {
                    key: "announcements",
                    label: "School announcements",
                    icon: MessageSquare,
                  },
                ].map(({ key, label, icon: Icon }) => (
                  <label
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-sm text-gray-700">{label}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications[key]}
                      onChange={() => handleToggle("emailNotifications", key)}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </label>
                ))}
              </div>
            )}
          </Card>

          {/* SMS Notifications */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <MessageSquare className="h-6 w-6 text-success-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    SMS Notifications
                  </h3>
                  <p className="text-sm text-gray-600">
                    Receive critical alerts via SMS
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.smsNotifications.enabled}
                  onChange={() => handleMasterToggle("smsNotifications")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-success-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-600"></div>
              </label>
            </div>

            {formData.smsNotifications.enabled && (
              <div className="space-y-3 pl-9">
                {[
                  {
                    key: "attendance",
                    label: "Low attendance alerts",
                    icon: CheckCircle,
                  },
                  {
                    key: "results",
                    label: "Exam results published",
                    icon: AlertCircle,
                  },
                  {
                    key: "library",
                    label: "Overdue book reminders",
                    icon: Bell,
                  },
                  {
                    key: "important",
                    label: "Important announcements only",
                    icon: MessageSquare,
                  },
                ].map(({ key, label, icon: Icon }) => (
                  <label
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-sm text-gray-700">{label}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.smsNotifications[key]}
                      onChange={() => handleToggle("smsNotifications", key)}
                      className="w-4 h-4 text-success-600 bg-gray-100 border-gray-300 rounded focus:ring-success-500"
                    />
                  </label>
                ))}
              </div>
            )}
          </Card>

          {/* Push Notifications */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Bell className="h-6 w-6 text-info-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-gray-600">
                    Receive browser notifications
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.pushNotifications.enabled}
                  onChange={() => handleMasterToggle("pushNotifications")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-info-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-info-600"></div>
              </label>
            </div>

            {formData.pushNotifications.enabled && (
              <div className="space-y-3 pl-9">
                {[
                  {
                    key: "courses",
                    label: "New course content available",
                    icon: Calendar,
                  },
                  {
                    key: "attendance",
                    label: "Attendance marked",
                    icon: CheckCircle,
                  },
                  {
                    key: "results",
                    label: "Results announced",
                    icon: AlertCircle,
                  },
                  {
                    key: "library",
                    label: "Library notifications",
                    icon: Bell,
                  },
                  {
                    key: "announcements",
                    label: "New announcements",
                    icon: MessageSquare,
                  },
                ].map(({ key, label, icon: Icon }) => (
                  <label
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-sm text-gray-700">{label}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.pushNotifications[key]}
                      onChange={() => handleToggle("pushNotifications", key)}
                      className="w-4 h-4 text-info-600 bg-gray-100 border-gray-300 rounded focus:ring-info-500"
                    />
                  </label>
                ))}
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={saving}
              icon={<Save className="h-4 w-4" />}
            >
              {saving ? "Saving..." : "Save Preferences"}
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

        {/* Info Card */}
        <Card className="mt-6 bg-warning-50 border-warning-200">
          <div className="text-sm text-warning-800">
            <p className="font-medium mb-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Important Notes:
            </p>
            <ul className="list-disc list-inside space-y-1 text-warning-700">
              <li>
                Critical security alerts will always be sent regardless of your
                settings
              </li>
              <li>
                Make sure your email and phone number are up to date in your
                profile
              </li>
              <li>
                Browser push notifications require permission in your browser
                settings
              </li>
              <li>
                SMS notifications may incur charges based on your mobile plan
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default NotificationSettings;
