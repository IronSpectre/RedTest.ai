import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { 
  FileText, 
  Calendar, 
  PenTool, 
  Search, 
  Camera, 
  ArrowRight, 
  FileCheck,
  Plus,
  Brain,
  Clock,
  Target,
  Zap,
  ScanLine,
  FileOutput,
  Stethoscope,
  Car
} from "lucide-react";
import { RegisterPage } from "./components/RegisterPage";
import { SignInPage } from "./components/SignInPage";
import { DashboardPage } from "./components/DashboardPage";
import { RedVanApp } from "./components/RedVanApp";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'register' | 'signin' | 'dashboard' | 'redvan'>('home');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const handleRegisterClick = () => {
    setCurrentPage('register');
  };

  const handleSignInClick = () => {
    setCurrentPage('signin');
  };

  const handleSignInSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleRedVanClick = () => {
    setCurrentPage('redvan');
  };

  const aiAgents = [
    {
      id: "extractor",
      name: "The Extractor",
      icon: FileText,
      shortDescription: "Pulls key data from your medical documents with precision",
      longDescription: "The Extractor is your document processing specialist. Using advanced OCR and medical terminology recognition, it can read any format of medical report - from handwritten notes to complex lab results.",
      capabilities: [
        "Reads all document formats (PDF, images, scanned docs)",
        "Recognizes medical terminology and abbreviations", 
        "Extracts numerical values and reference ranges",
        "Identifies critical flags and abnormal results",
        "Maintains 99.9% accuracy on structured reports"
      ],
      personality: "Methodical and precise, never misses a detail"
    },
    {
      id: "timeline",
      name: "Timeline Builder", 
      icon: Calendar,
      shortDescription: "Creates chronological health timelines from your reports",
      longDescription: "The Timeline Builder specializes in organizing your health journey chronologically. It connects the dots between different reports, treatments, and outcomes to show how your health evolves over time.",
      capabilities: [
        "Organizes reports by date automatically",
        "Links related tests and follow-ups",
        "Identifies health trends and patterns",
        "Creates visual health progression charts",
        "Highlights important milestone events"
      ],
      personality: "Organized and detail-oriented, loves connecting the dots"
    },
    {
      id: "summarizer",
      name: "Summarizer",
      icon: PenTool, 
      shortDescription: "Transforms complex medical data into clear summaries",
      longDescription: "The Summarizer takes complex medical jargon and transforms it into clear, understandable language. It creates comprehensive yet accessible summaries that you can actually understand and share with family.",
      capabilities: [
        "Translates medical jargon to plain English",
        "Creates executive summaries of health status",
        "Highlights key findings and recommendations", 
        "Generates shareable health reports",
        "Adapts language complexity to your preference"
      ],
      personality: "Clear communicator, passionate about making health accessible"
    },
    {
      id: "analyzer", 
      name: "Analyzer",
      icon: Search,
      shortDescription: "Identifies trends and patterns in your health data",
      longDescription: "The Analyzer is your health detective. It looks for patterns, trends, and correlations across all your health data to identify potential issues early and track your progress toward health goals.",
      capabilities: [
        "Identifies concerning trends before they become serious",
        "Correlates symptoms with test results",
        "Tracks medication effectiveness over time",
        "Predicts potential health risks",
        "Generates actionable health insights"
      ],
      personality: "Analytical and proactive, always thinking three steps ahead"
    }
  ];

  if (currentPage === 'register') {
    return <RegisterPage onBack={handleBackToHome} />;
  }

  if (currentPage === 'signin') {
    return <SignInPage onBack={handleBackToHome} onRegister={handleRegisterClick} onSignIn={handleSignInSuccess} />;
  }

  if (currentPage === 'dashboard') {
    return <DashboardPage onSignOut={handleBackToHome} />;
  }

  if (currentPage === 'redvan') {
    return <RedVanApp onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 fixed top-0 left-0 right-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">RedTest.ai</span>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-red-600 transition-colors">
                Home
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-red-600 transition-colors">
                How It Works
              </a>
              <a href="#ai-agents" className="text-gray-700 hover:text-red-600 transition-colors">
                Meet the AI Agents
              </a>
              <button 
                onClick={handleRedVanClick}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                RedVan Demo
              </button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="hidden sm:inline-flex"
                onClick={handleSignInClick}
              >
                Sign In
              </Button>
              <Button 
                variant="outline" 
                className="hidden md:inline-flex border-red-600 text-red-600 hover:bg-red-50 hover:text-red-600 hover:border-red-700 hover:shadow-lg hover:shadow-red-200/50 transform hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 ease-out"
                onClick={() => window.open('mailto:contact@redtest.ai', '_blank')}
              >
                Get in Touch
              </Button>
              <Button onClick={handleRegisterClick} className="bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                Register Your Interest
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Health, Analyzed by AI Agents
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload your reports. Let our AI team do the rest. Each agent specializes in one part of your care journey — like a virtual assistant just for you.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <Button 
              size="lg" 
              onClick={handleRegisterClick}
              className="bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-6 h-auto shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Register Your Interest
            </Button>
            <div className="text-center">
              <p className="text-gray-600 mb-2">or</p>
              <Button 
                variant="outline"
                size="lg"
                onClick={handleRedVanClick}
                className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-600 hover:border-red-700 text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <Car className="w-5 h-5 mr-2" />
                Try RedVan Mobile Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Is RedTest.ai */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-8">
            What Is RedTest.ai
          </h2>
          
          <div className="max-w-2xl mx-auto mb-16">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              RedTest.ai is a health intelligence platform designed to make sense of real-world diagnostic data — even when it's incomplete, inconsistent, or decades old.
              It accepts medical records in the form most people actually have them: camera photos, scanned PDFs, or handwritten lab reports.
              RedTest reads and extracts key values, reconstructs test timelines, and creates clean, doctor-friendly summaries — no hospital systems or EHRs required.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-center mt-6 font-medium">
              This isn't automation for the privileged — it's diagnostic continuity for the rest of the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                <ScanLine className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Reads unstructured test reports
              </h3>
              <p className="text-gray-600">
                From scans, photos, or prescriptions
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Reconstructs patient timelines
              </h3>
              <p className="text-gray-600">
                Organizes test history across years
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                <FileOutput className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Generates health summaries
              </h3>
              <p className="text-gray-600">
                Doctor-friendly, clear, multilingual
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Built for real-world clinics
              </h3>
              <p className="text-gray-600">
                No setup, no EHR, just results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your AI Team */}
      <section id="ai-agents" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Meet Your AI Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiAgents.map((agent) => (
              <Dialog key={agent.id}>
                <DialogTrigger asChild>
                  <button className="bg-red-600 text-white flex flex-col gap-6 rounded-xl border border-red-700 text-center hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1 hover:scale-105 p-0 hover:bg-red-700">
                    <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-white rounded-full">
                        <agent.icon className="w-8 h-8 text-red-600" />
                      </div>
                      <h4 className="leading-none text-xl text-white">{agent.name}</h4>
                    </div>
                    <div className="px-6 [&:last-child]:pb-6">
                      <p className="text-red-100">
                        {agent.shortDescription}
                      </p>
                      <p className="text-sm text-white mt-3 font-medium">
                        Click to learn more →
                      </p>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                        <agent.icon className="w-6 h-6 text-red-600" />
                      </div>
                      <DialogTitle className="text-2xl">{agent.name}</DialogTitle>
                    </div>
                    <DialogDescription className="text-lg text-gray-600 leading-relaxed">
                      {agent.longDescription}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                        <Zap className="w-5 h-5 text-red-600 mr-2" />
                        Key Capabilities
                      </h4>
                      <ul className="space-y-2">
                        {agent.capabilities.map((capability, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-2">
                        <Brain className="w-5 h-5 text-red-600 mr-2" />
                        Personality
                      </h4>
                      <p className="text-gray-600 italic">"{agent.personality}"</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                1. Take a photo of your old test report
              </h3>
              <p className="text-gray-600">
                Simply snap a photo or upload a digital copy of your medical report
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2. We extract and organize your data
              </h3>
              <p className="text-gray-600">
                Our AI agents work together to process and understand your health information
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                <FileCheck className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                3. You get a health summary PDF
              </h3>
              <p className="text-gray-600">
                Receive a comprehensive, easy-to-understand summary of your health data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join thousands of users who trust RedTest with their health data
          </p>
          <Button 
            size="lg" 
            onClick={handleRegisterClick}
            className="bg-white text-red-600 hover:bg-gray-50 text-xl px-12 py-6 h-auto shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Register Your Interest
          </Button>
        </div>
      </section>
    </div>
  );
}