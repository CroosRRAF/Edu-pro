import { createContext, useContext, useState } from "react";

// Tab Context
const TabsContext = createContext();

/**
 * Tabs Component - Container for tab navigation
 */
export const Tabs = ({ children, value, onChange, className = "" }) => {
  const [activeTab, setActiveTab] = useState(value || "");

  const handleChange = (newValue) => {
    setActiveTab(newValue);
    onChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

/**
 * TabList Component - Container for tab buttons
 */
export const TabList = ({ children, className = "" }) => {
  return (
    <div
      className={`border-b border-gray-200 mb-4 ${className}`}
      role="tablist"
    >
      <div className="flex space-x-4">{children}</div>
    </div>
  );
};

/**
 * Tab Component - Individual tab button
 */
export const Tab = ({ value, children, className = "" }) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tab must be used within Tabs component");
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={`
        px-4 py-2 text-sm font-medium border-b-2 transition-colors
        ${
          isActive
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

/**
 * TabPanel Component - Content container for each tab
 */
export const TabPanel = ({ value, children, className = "" }) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("TabPanel must be used within Tabs component");
  }

  const { activeTab } = context;

  if (activeTab !== value) {
    return null;
  }

  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  );
};

// Default export for convenience
export default Tabs;
