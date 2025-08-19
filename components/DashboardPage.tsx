import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  Upload, 
  FileText, 
  Download,
  TrendingUp,
  FileDown,
  LogOut,
  Plus,
  MessageCircle,
  Pill,
  RefreshCw,
  BarChart3,
  Home,
  Activity
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ReportsPage } from "./ReportsPage";
import { MedicinePage } from "./MedicinePage";
import { ConversionPage } from "./ConversionPage";
import { ChatPage } from "./ChatPage";
import { TimelinePage } from "./TimelinePage";

interface DashboardPageProps {
  onSignOut: () => void;
}

export function DashboardPage({ onSignOut }: DashboardPageProps) {
  const [currentPage, setCurrentPage] = useState<'overview' | 'reports' | 'medicines' | 'conversion' | 'chat' | 'timeline'>('overview');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [selectedSummary, setSelectedSummary] = useState<'patient' | 'doctor'>('patient');
  const [selectedExportCountry, setSelectedExportCountry] = useState('');
  const [selectedExportFormat, setSelectedExportFormat] = useState('');

  // Mock data for the spreadsheet
  const mockData = [
    { testName: "Hemoglobin", value: "13.4", unit: "g/dL", referenceRange: "13.5–17.5", date: "12/06/2023", status: "Low" },
    { testName: "White Blood Cell Count", value: "7.2", unit: "×10³/μL", referenceRange: "4.0–11.0", date: "12/06/2023", status: "Normal" },
    { testName: "Platelet Count", value: "285", unit: "×10³/μL", referenceRange: "150–450", date: "12/06/2023", status: "Normal" },
    { testName: "Blood Glucose", value: "110", unit: "mg/dL", referenceRange: "70–100", date: "12/06/2023", status: "High" },
    { testName: "Total Cholesterol", value: "195", unit: "mg/dL", referenceRange: "&lt;200", date: "12/06/2023", status: "Normal" },
    { testName: "HbA1c", value: "6.2", unit: "%", referenceRange: "&lt;5.7", date: "12/06/2023", status: "High" }
  ];

  // Mock timeline data
  const timelineData = [
    { date: "06/2023", hemoglobin: 12.8, glucose: 105, hba1c: 6.0 },
    { date: "09/2023", hemoglobin: 13.1, glucose: 108, hba1c: 6.1 },
    { date: "12/2023", hemoglobin: 13.4, glucose: 110, hba1c: 6.2 }
  ];

  const countries = [
    { code: "SG", name: "Singapore", flag: "🇸🇬" },
    { code: "TH", name: "Thailand", flag: "🇹🇭" },
    { code: "AE", name: "UAE", flag: "🇦🇪" },
    { code: "TR", name: "Turkey", flag: "🇹🇷" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" }
  ];

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFiles(prev => [...prev, files[0].name]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      case 'Normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
    { id: 'medicines', label: 'Medicines', icon: <Pill className="w-4 h-4" /> },
    { id: 'timeline', label: 'Timeline', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'conversion', label: 'Conversion', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'chat', label: 'AI Chat', icon: <MessageCircle className="w-4 h-4" /> }
  ];

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'reports':
        return <ReportsPage />;
      case 'medicines':
        return <MedicinePage />;
      case 'timeline':
        return <TimelinePage />;
      case 'conversion':
        return <ConversionPage />;
      case 'chat':
        return <ChatPage />;
      default:
        return renderOverviewPage();
    }
  };

  const renderOverviewPage = () => (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          RedTest Beta1 – Turn Your Offline Reports Into Smart, Usable Data
        </h1>
        <p className="text-lg text-gray-600">
          Upload your medical reports and let our AI transform them into actionable health insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Upload */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2 text-red-600" />
                Upload Reports
              </CardTitle>
              <CardDescription>
                Drag &amp; drop or click to upload your medical reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <div className="flex justify-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop files here or click to browse
                </p>
                <p className="text-gray-500 mb-4">
                  Supports JPG, PNG, PDF up to 10MB
                </p>
                
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                
                {isUploading && (
                  <div className="mb-4">
                    <Progress value={uploadProgress} className="mb-2" />
                    <p className="text-sm text-gray-600">Uploading... {uploadProgress}%</p>
                  </div>
                )}
                
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => setCurrentPage('reports')}>
                  Select Files
                </Button>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Recent Files:</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm">{file}</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Processed</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentPage('reports')}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-red-600" />
                  Manage Reports
                </CardTitle>
                <CardDescription>
                  Upload, view, and organize all your medical reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-600">Total Reports</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentPage('medicines')}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pill className="w-5 h-5 mr-2 text-red-600" />
                  Track Medicines
                </CardTitle>
                <CardDescription>
                  Monitor your medications and prescriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                    <p className="text-sm text-gray-600">Active Medications</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Pill className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentPage('timeline')}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-red-600" />
                  Health Timeline
                </CardTitle>
                <CardDescription>
                  Track your health metrics over time and identify trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">18</p>
                    <p className="text-sm text-gray-600">Months Tracked</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentPage('conversion')}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="w-5 h-5 mr-2 text-red-600" />
                  Convert Reports
                </CardTitle>
                <CardDescription>
                  Convert reports between different country formats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                    <p className="text-sm text-gray-600">Countries Supported</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentPage('chat')}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-red-600" />
                  AI Medical Chat
                </CardTitle>
                <CardDescription>
                  Chat with AI to understand your health data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">24/7</p>
                    <p className="text-sm text-gray-600">Available</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-red-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Blood Test Results Analyzed</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Pill className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Medication Reminder Set</p>
                    <p className="text-sm text-gray-600">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">AI Chat Session</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">RedTest.ai</span>
              <Badge className="ml-2 bg-red-100 text-red-800">Beta1</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="text-gray-600">
                <FileDown className="w-4 h-4 mr-2" />
                Export All
              </Button>
              <Button 
                variant="outline" 
                onClick={onSignOut}
                className="text-gray-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  currentPage === item.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </div>
    </div>
  );
}