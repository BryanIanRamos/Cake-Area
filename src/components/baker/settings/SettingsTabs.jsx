import React from 'react';

const SettingsTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', label: 'Personal Information' },
    { id: 'business', label: 'Business Information' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <div className="flex gap-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 rounded-lg ${
            activeTab === tab.id
              ? "bg-[#E88F2A] text-white"
              : "bg-white text-gray-600"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SettingsTabs; 