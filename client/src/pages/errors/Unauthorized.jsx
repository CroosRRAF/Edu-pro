import { ArrowLeft, Home, LogIn, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

/**
 * Unauthorized (401) Page
 *
 * Displayed when users try to access a resource without proper authentication
 * or when their session has expired.
 */
const Unauthorized = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Clear any existing auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to login
    navigate("/login", { state: { from: window.location.pathname } });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Shield Icon */}
        <div className="mb-8 relative">
          <div className="inline-flex items-center justify-center">
            <ShieldAlert
              className="w-32 h-32 text-orange-500 animate-pulse"
              strokeWidth={1.5}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl font-bold text-orange-100 opacity-20 select-none">
              401
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Access Denied
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          You don't have permission to access this page.
        </p>
        <p className="text-gray-500 mb-8">
          This might be because you're not logged in, your session has expired,
          or you don't have the necessary permissions.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant="primary"
            onClick={handleLogin}
            icon={<LogIn className="h-4 w-4" />}
            size="lg"
          >
            Login
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
            icon={<Home className="h-4 w-4" />}
            size="lg"
          >
            Go to Home
          </Button>
          <Button
            variant="outline"
            onClick={goBack}
            icon={<ArrowLeft className="h-4 w-4" />}
            size="lg"
          >
            Go Back
          </Button>
        </div>

        {/* Information Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Why am I seeing this?
          </h2>
          <div className="text-left space-y-3 text-gray-600">
            <div className="flex items-start">
              <span className="text-orange-500 mr-3 mt-1">•</span>
              <p>
                <span className="font-semibold">Session Expired:</span> Your
                login session may have expired. Please log in again to continue.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-orange-500 mr-3 mt-1">•</span>
              <p>
                <span className="font-semibold">Insufficient Permissions:</span>{" "}
                You may not have the required role or permissions to access this
                resource.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-orange-500 mr-3 mt-1">•</span>
              <p>
                <span className="font-semibold">Not Logged In:</span> This page
                requires authentication. Please log in to continue.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-orange-500 mr-3 mt-1">•</span>
              <p>
                <span className="font-semibold">Token Invalid:</span> Your
                authentication token may be invalid or has been revoked.
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-orange-800">
            <span className="font-semibold">🔒 Security Notice:</span> If you
            believe you should have access to this page and are seeing this
            message in error, please contact your system administrator or
            support team.
          </p>
        </div>

        {/* Help Text */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Need Help?</span>
            <br />
            Contact support at{" "}
            <a
              href="mailto:support@edupro.com"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              support@edupro.com
            </a>{" "}
            for assistance with your account or permissions.
          </p>
        </div>

        {/* Error Code */}
        <p className="text-xs text-gray-400 mt-6">
          Error Code: 401 • Unauthorized Access
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
