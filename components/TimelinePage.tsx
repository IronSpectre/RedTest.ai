import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Activity, 
  Filter,
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function TimelinePage() {
  const [selectedTest, setSelectedTest] = useState<string>("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("1year");
  const [viewMode, setViewMode] = useState<'chart' | 'list'>('chart');

  // Mock timeline data for different tests
  const timelineData = [
    { 
      date: "2023-06", 
      dateFormatted: "June 2023",
      hemoglobin: 12.8, 
      glucose: 105, 
      hba1c: 6.0, 
      cholesterol: 180, 
      wbc: 6.8,
      platelet: 250
    },
    { 
      date: "2023-09", 
      dateFormatted: "Sept 2023",
      hemoglobin: 13.1, 
      glucose: 108, 
      hba1c: 6.1, 
      cholesterol: 185, 
      wbc: 7.0,
      platelet: 265
    },
    { 
      date: "2023-12", 
      dateFormatted: "Dec 2023",
      hemoglobin: 13.4, 
      glucose: 110, 
      hba1c: 6.2, 
      cholesterol: 190, 
      wbc: 7.2,
      platelet: 285
    },
    { 
      date: "2024-03", 
      dateFormatted: "March 2024",
      hemoglobin: 13.2, 
      glucose: 115, 
      hba1c: 6.3, 
      cholesterol: 195, 
      wbc: 7.1,
      platelet: 290
    },
    { 
      date: "2024-06", 
      dateFormatted: "June 2024",
      hemoglobin: 13.6, 
      glucose: 112, 
      hba1c: 6.1, 
      cholesterol: 185, 
      wbc: 6.9,
      platelet: 275
    }
  ];

  const testDefinitions = [
    {
      id: "hemoglobin",
      name: "Hemoglobin",
      unit: "g/dL",
      normalRange: "13.5-17.5",
      color: "#dc2626",
      description: "Protein in red blood cells that carries oxygen"
    },
    {
      id: "glucose",
      name: "Blood Glucose",
      unit: "mg/dL",
      normalRange: "70-100",
      color: "#2563eb",
      description: "Amount of sugar in your blood"
    },
    {
      id: "hba1c",
      name: "HbA1c",
      unit: "%",
      normalRange: "<5.7",
      color: "#16a34a",
      description: "Average blood sugar over 2-3 months"
    },
    {
      id: "cholesterol",
      name: "Total Cholesterol",
      unit: "mg/dL",
      normalRange: "<200",
      color: "#ca8a04",
      description: "Total amount of cholesterol in blood"
    },
    {
      id: "wbc",
      name: "White Blood Cells",
      unit: "×10³/μL",
      normalRange: "4.0-11.0",
      color: "#9333ea",
      description: "Cells that fight infection"
    },
    {
      id: "platelet",
      name: "Platelet Count",
      unit: "×10³/μL",
      normalRange: "150-450",
      color: "#f59e0b",
      description: "Cells that help blood clot"
    }
  ];

  const milestones = [
    {
      date: "2023-06-15",
      title: "First Comprehensive Blood Panel",
      description: "Baseline measurements established",
      type: "test",
      icon: <Activity className="w-4 h-4" />
    },
    {
      date: "2023-08-20",
      title: "Started Medication",
      description: "Began taking Metformin for blood sugar control",
      type: "medication",
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      date: "2023-11-10",
      title: "Dietary Changes",
      description: "Implemented low-carb diet plan",
      type: "lifestyle",
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      date: "2024-02-05",
      title: "Exercise Routine",
      description: "Started regular cardiovascular exercise",
      type: "lifestyle",
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      date: "2024-05-15",
      title: "Medication Adjustment",
      description: "Reduced Metformin dosage due to improvement",
      type: "medication",
      icon: <CheckCircle className="w-4 h-4" />
    }
  ];

  const getTrendIcon = (currentValue: number, previousValue: number) => {
    if (currentValue > previousValue) return <TrendingUp className="w-4 h-4 text-red-600" />;
    if (currentValue < previousValue) return <TrendingDown className="w-4 h-4 text-green-600" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getStatusColor = (value: number, testId: string) => {
    const normalRanges: { [key: string]: { min: number; max: number } } = {
      hemoglobin: { min: 13.5, max: 17.5 },
      glucose: { min: 70, max: 100 },
      hba1c: { min: 0, max: 5.7 },
      cholesterol: { min: 0, max: 200 },
      wbc: { min: 4.0, max: 11.0 },
      platelet: { min: 150, max: 450 }
    };

    const range = normalRanges[testId];
    if (!range) return "bg-gray-100 text-gray-800";
    
    if (value < range.min) return "bg-yellow-100 text-yellow-800";
    if (value > range.max) return "bg-red-100 text-red-800";
    return "bg-green-100 text-green-800";
  };

  const getFilteredData = () => {
    if (selectedTest === "all") return timelineData;
    return timelineData.map(item => ({
      date: item.date,
      dateFormatted: item.dateFormatted,
      [selectedTest]: item[selectedTest as keyof typeof item]
    }));
  };

  const renderChart = () => {
    const data = getFilteredData();
    
    if (selectedTest === "all") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateFormatted" />
            <YAxis />
            <Tooltip 
              formatter={(value: any, name: string) => [
                `${value} ${testDefinitions.find(t => t.id === name)?.unit || ''}`,
                testDefinitions.find(t => t.id === name)?.name || name
              ]}
            />
            {testDefinitions.map(test => (
              <Line 
                key={test.id}
                type="monotone" 
                dataKey={test.id} 
                stroke={test.color}
                strokeWidth={2}
                dot={{ fill: test.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    } else {
      const selectedTestDef = testDefinitions.find(t => t.id === selectedTest);
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateFormatted" />
            <YAxis />
            <Tooltip 
              formatter={(value: any) => [
                `${value} ${selectedTestDef?.unit || ''}`,
                selectedTestDef?.name || selectedTest
              ]}
            />
            <Line 
              type="monotone" 
              dataKey={selectedTest} 
              stroke={selectedTestDef?.color || '#dc2626'}
              strokeWidth={3}
              dot={{ fill: selectedTestDef?.color || '#dc2626', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Timeline</h1>
          <p className="text-gray-600 mt-1">
            Track your health metrics over time and identify trends
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Timeline
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setViewMode(viewMode === 'chart' ? 'list' : 'chart')}
          >
            {viewMode === 'chart' ? <Eye className="w-4 h-4 mr-2" /> : <BarChart3 className="w-4 h-4 mr-2" />}
            {viewMode === 'chart' ? 'List View' : 'Chart View'}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={selectedTest} onValueChange={setSelectedTest}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select test type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tests</SelectItem>
              {testDefinitions.map(test => (
                <SelectItem key={test.id} value={test.id}>
                  {test.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
              <SelectItem value="2years">2 Years</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart/List View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-red-600" />
                {selectedTest === "all" ? "All Health Metrics" : testDefinitions.find(t => t.id === selectedTest)?.name}
              </CardTitle>
              <CardDescription>
                {selectedTest === "all" 
                  ? "Overview of all your health metrics over time"
                  : testDefinitions.find(t => t.id === selectedTest)?.description
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {viewMode === 'chart' ? (
                renderChart()
              ) : (
                <div className="space-y-4">
                  {timelineData.map((item, index) => (
                    <div key={item.date} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">{item.dateFormatted}</h4>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {testDefinitions.map(test => {
                          const value = item[test.id as keyof typeof item] as number;
                          const prevValue = index > 0 ? timelineData[index - 1][test.id as keyof typeof timelineData[0]] as number : value;
                          
                          return (
                            <div key={test.id} className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">{test.name}</p>
                                <p className="font-medium">{value} {test.unit}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {getTrendIcon(value, prevValue)}
                                <Badge className={getStatusColor(value, test.id)}>
                                  {value < parseFloat(test.normalRange.split('-')[0]) ? 'Low' : 
                                   value > parseFloat(test.normalRange.split('-')[1] || test.normalRange.replace('<', '')) ? 'High' : 'Normal'}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats & Milestones */}
        <div className="space-y-6">
          {/* Summary Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                  <p className="text-sm text-gray-600">Data Points</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                  <p className="text-sm text-gray-600">Months Tracked</p>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">67%</p>
                <p className="text-sm text-gray-600">Tests in Normal Range</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">2</p>
                <p className="text-sm text-gray-600">Trends to Watch</p>
              </div>
            </CardContent>
          </Card>

          {/* Key Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-red-600" />
                Key Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.slice(0, 4).map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.type === 'test' ? 'bg-blue-100 text-blue-600' :
                      milestone.type === 'medication' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{milestone.title}</h4>
                      <p className="text-xs text-gray-600">{milestone.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{milestone.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                Health Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Blood Sugar Trending Up</p>
                    <p className="text-xs text-gray-600">Consider reviewing diet with doctor</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Cholesterol Improving</p>
                    <p className="text-xs text-gray-600">Great progress with lifestyle changes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}