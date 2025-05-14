import { useState } from "react";
import { CheckCircle, ChevronRight, Shield, Building, ShoppingBag, GraduationCap } from "lucide-react";

const UseCasesSection = () => {
  const [activeTab, setActiveTab] = useState("financial");
  
  // Theme colors
  const colors = {
    darkBlue: "#232288",
    purple: "#8C52FF",
    red: "#FF5757"
  };
  
  const tabColors = {
    financial: colors.red,
    government: colors.purple,
    ecommerce: colors.darkBlue,
    education: colors.purple
  };
  
  const tabs = [
    {
      id: "financial",
      title: "Financial",
      icon: <Shield className="mr-2 h-5 w-5" />,
      heading: "Financial Institutions",
      description: "Banks, payment gateways, and financial services can streamline their KYC processes while ensuring compliance and security.",
      items: [
        "Khalti, eSewa and other payment platforms",
        "Banks and credit unions",
        "Insurance providers and microfinance institutions"
      ]
    },
    {
      id: "government",
      title: "Government",
      icon: <Building className="mr-2 h-5 w-5" />,
      heading: "Government Services",
      description: "Government agencies can verify citizen identity while respecting privacy, reducing paperwork, and eliminating redundancies.",
      items: [
        "Department of Transport Management",
        "Land Revenue and Property Registration",
        "Tax authorities and public service portals"
      ]
    },
    {
      id: "ecommerce",
      title: "E-commerce",
      icon: <ShoppingBag className="mr-2 h-5 w-5" />,
      heading: "E-commerce Platforms",
      description: "Online marketplaces can quickly verify users while enhancing security, trust, and streamlining the shopping experience.",
      items: [
        "Age-restricted product purchases",
        "Secure checkout processes",
        "Account verification and fraud prevention"
      ]
    },
    {
      id: "education",
      title: "Education",
      icon: <GraduationCap className="mr-2 h-5 w-5" />,
      heading: "Higher Education",
      description: "Educational institutions can verify student identities for admissions, exams, and credential issuance with ease and security.",
      items: [
        "University admissions and enrollment",
        "Scholarship applications and eligibility",
        "Degree verification and credential management"
      ]
    }
  ];

  return (
    <section className="py-24" style={{ background: `linear-gradient( ${colors.darkBlue}30)` }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent" 
              style={{ backgroundImage: `linear-gradient(90deg, ${colors.purple}, ${colors.red})` }}>
              Where You Can Use zkIDNepal
            </h2>
            <div className="h-1 w-24 mx-auto rounded" style={{ background: `linear-gradient(90deg, ${colors.purple}, ${colors.red})` }}></div>
          </div>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">Our zero-knowledge identity solution works seamlessly across multiple sectors and platforms, providing privacy-preserving verification.</p>
        </div>

        {/* Custom Tabs Navigation */}
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto">
          <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl" style={{ background: `linear-gradient(145deg, #111, ${colors.darkBlue}20)` }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full px-6 py-5 text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? "border-l-4"
                      : "hover:bg-gray-800/30"
                  }`}
                  style={{ 
                    borderLeftColor: activeTab === tab.id ? tabColors[tab.id] : 'transparent',
                    background: activeTab === tab.id ? `linear-gradient(to right, ${tabColors[tab.id]}10, transparent)` : ''
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <span style={{ color: activeTab === tab.id ? tabColors[tab.id] : '#6b7280' }}>
                        {tab.icon}
                      </span>
                      <span className={`font-medium ${activeTab === tab.id ? "text-white" : "text-gray-400"}`}>{tab.title}</span>
                    </div>
                    {activeTab === tab.id && (
                      <ChevronRight className="h-5 w-5" style={{ color: tabColors[tab.id] }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:w-2/3">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`p-8 rounded-2xl shadow-2xl border border-gray-800 transition-all duration-300 ${
                  activeTab === tab.id ? "opacity-100 transform translate-y-0" : "hidden"
                }`}
                style={{ 
                  background: `linear-gradient(135deg, #111, ${colors.darkBlue}20)`,
                  borderColor: `${tabColors[tab.id]}40`
                }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-2 h-12 mr-4 rounded" style={{ backgroundColor: tabColors[tab.id] }}></div>
                  <h3 className="text-2xl font-bold text-white">{tab.heading}</h3>
                </div>
                <p className="mb-6 text-slate-300 text-lg">{tab.description}</p>
                
                <div className="space-y-4">
                  {tab.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <CheckCircle className="h-6 w-6 mt-0.5 flex-shrink-0" style={{ color: tabColors[tab.id] }} />
                      <div>
                        <p className="text-white font-medium transition-colors duration-200" 
                          style={{ textShadow: '0 0 30px rgba(0,0,0,0.5)' }}>{item}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-xl" 
                  style={{ 
                    background: `linear-gradient(145deg, rgba(30,30,40,0.9), rgba(15,15,20,0.95))`,
                    boxShadow: `0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 ${tabColors[tab.id]}20`
                  }}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: tabColors[tab.id] }}>Get Started</h4>
                      <p className="text-gray-400">Integrate zkIDNepal for your {tab.title.toLowerCase()} needs</p>
                    </div>
                    <button className="px-4 py-2 text-white rounded-lg font-medium transition-all duration-200 flex items-center"
                      style={{ 
                        background: `linear-gradient(90deg, ${tabColors[tab.id]}, ${tab.id === "financial" ? colors.purple : colors.red})`,
                        boxShadow: `0 4px 12px ${tabColors[tab.id]}40`
                      }}>
                      Learn More
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;