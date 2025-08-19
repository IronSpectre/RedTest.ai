import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  CreditCard, 
  FileText, 
  User, 
  Home, 
  TestTube, 
  Heart, 
  Activity, 
  Download, 
  Edit, 
  X, 
  Check, 
  Fingerprint, 
  Eye, 
  EyeOff,
  Phone,
  Mail,
  Car,
  CheckCircle,
  AlertCircle,
  Plus,
  Minus,
  Star,
  Shield,
  Zap,
  Globe,
  Sparkles,
  Clock3,
  Trophy,
  ThumbsUp,
  Camera,
  Navigation,
  Smile,
  Menu,
  LogOut
} from "lucide-react";

type Screen = 
  | 'login' 
  | 'signup' 
  | 'home' 
  | 'booking-select' 
  | 'booking-address' 
  | 'booking-datetime' 
  | 'booking-payment' 
  | 'booking-confirmation' 
  | 'appointments' 
  | 'results' 
  | 'profile';

interface Appointment {
  id: string;
  testType: string;
  date: string;
  time: string;
  address: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  arrivalTime?: string;
}

interface TestResult {
  id: string;
  testType: string;
  date: string;
  status: 'ready' | 'processing';
  summary?: string;
  pdfUrl?: string;
}

interface RedVanAppProps {
  onBack?: () => void;
}

export function RedVanApp({ onBack }: RedVanAppProps = {}) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedTestType, setSelectedTestType] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const testTypes = [
    { 
      id: 'blood', 
      name: 'Blood Test', 
      description: 'Complete blood count, lipid panel, glucose', 
      price: '$89', 
      icon: TestTube,
      time: '15 mins'
    },
    { 
      id: 'ecg', 
      name: 'ECG', 
      description: 'Electrocardiogram heart monitoring', 
      price: '$120', 
      icon: Heart,
      time: '20 mins'
    },
    { 
      id: 'urine', 
      name: 'Urine Test', 
      description: 'Urinalysis and kidney function', 
      price: '$45', 
      icon: Activity,
      time: '10 mins'
    },
    { 
      id: 'comprehensive', 
      name: 'Comprehensive Panel', 
      description: 'Blood, urine, and basic vitals', 
      price: '$199', 
      icon: FileText,
      time: '45 mins'
    }
  ];

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const mockAppointments: Appointment[] = [
    {
      id: '1',
      testType: 'Blood Test',
      date: '2024-01-15',
      time: '10:00 AM',
      address: '123 Main St, San Francisco, CA',
      status: 'upcoming',
      arrivalTime: '9:45 AM'
    },
    {
      id: '2',
      testType: 'ECG',
      date: '2024-01-10',
      time: '2:00 PM',
      address: '456 Oak Ave, San Francisco, CA',
      status: 'completed'
    }
  ];

  const mockResults: TestResult[] = [
    {
      id: '1',
      testType: 'Blood Test',
      date: '2024-01-10',
      status: 'ready',
      summary: 'All values within normal range. Cholesterol slightly elevated but not concerning.',
      pdfUrl: '#'
    },
    {
      id: '2',
      testType: 'Urine Test',
      date: '2024-01-05',
      status: 'ready',
      summary: 'Normal kidney function. No signs of infection or abnormalities detected.',
      pdfUrl: '#'
    },
    {
      id: '3',
      testType: 'ECG',
      date: '2024-01-03',
      status: 'processing',
      summary: 'Results are being reviewed by our medical team.'
    }
  ];

  const renderSidebar = () => (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">RedVan</h1>
            <p className="text-sm text-gray-600">Healthcare at your doorstep</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant={currentScreen === 'home' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentScreen('home')}
        >
          <Home className="w-4 h-4 mr-3" />
          Dashboard
        </Button>
        
        <Button
          variant={currentScreen === 'booking-select' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentScreen('booking-select')}
        >
          <TestTube className="w-4 h-4 mr-3" />
          Book a Test
        </Button>
        
        <Button
          variant={currentScreen === 'appointments' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentScreen('appointments')}
        >
          <CalendarIcon className="w-4 h-4 mr-3" />
          Appointments
        </Button>
        
        <Button
          variant={currentScreen === 'results' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentScreen('results')}
        >
          <FileText className="w-4 h-4 mr-3" />
          Test Results
        </Button>
        
        <Button
          variant={currentScreen === 'profile' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setCurrentScreen('profile')}
        >
          <User className="w-4 h-4 mr-3" />
          Profile
        </Button>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {onBack && (
          <Button
            variant="outline"
            className="w-full"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to RedTest.ai
          </Button>
        )}
      </div>
    </div>
  );

  const renderLoginScreen = () => (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Hero */}
      <div className="flex-1 bg-red-600 flex items-center justify-center p-8">
        <div className="max-w-md text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Welcome to RedVan</h1>
          <p className="text-red-100 text-lg mb-6">
            Professional healthcare diagnostics delivered to your location. 
            Book tests, track results, and manage your health journey.
          </p>
          <div className="flex items-center justify-center space-x-1 text-sm">
            <Star className="w-4 h-4 text-yellow-300" />
            <span>4.9 rating • Trusted by 50K+ patients</span>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {onBack && (
            <Button 
              variant="ghost" 
              className="mb-6"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to RedTest.ai
            </Button>
          )}
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="text-gray-600 mt-2">Welcome back! Please enter your details.</p>
          </div>

          <form className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="button"
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => setCurrentScreen('home')}
            >
              Sign In
            </Button>

            <div className="text-center">
              <span className="text-gray-500">or</span>
            </div>

            <Button 
              type="button"
              variant="outline" 
              className="w-full"
            >
              <Fingerprint className="w-4 h-4 mr-2" />
              Sign in with biometrics
            </Button>

            <div className="text-center">
              <button 
                type="button"
                onClick={() => setCurrentScreen('signup')}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const renderSignupScreen = () => (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Hero */}
      <div className="flex-1 bg-blue-600 flex items-center justify-center p-8">
        <div className="max-w-md text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Join RedVan Today</h1>
          <p className="text-blue-100 text-lg mb-6">
            Start your health journey with convenient, professional healthcare 
            services delivered directly to your location.
          </p>
          <div className="flex items-center justify-center space-x-1 text-sm">
            <Shield className="w-4 h-4 text-blue-200" />
            <span>HIPAA Compliant • Fully Licensed</span>
          </div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => setCurrentScreen('login')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to sign in
          </Button>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
            <p className="text-gray-600 mt-2">Get started with RedVan healthcare services.</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="John"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="(555) 123-4567"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => setCurrentScreen('home')}
            >
              Create Account
            </Button>

            <div className="text-center text-sm text-gray-600">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const renderMainLayout = (content: React.ReactNode) => (
    <div className="min-h-screen bg-gray-50 flex">
      {renderSidebar()}
      <div className="flex-1 flex flex-col">
        {content}
      </div>
    </div>
  );

  const renderHomeScreen = () => renderMainLayout(
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good morning, Sarah! 👋
          </h1>
          <p className="text-gray-600">
            Here's an overview of your health activities and upcoming appointments.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ready Results</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TestTube className="w-5 h-5 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tests Done</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Health Score</p>
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentScreen('booking-select')}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <TestTube className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Book a Test</h3>
                      <p className="text-gray-600">Schedule your next health check</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentScreen('appointments')}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">View Appointments</h3>
                      <p className="text-gray-600">Manage your bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentScreen('results')}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Test Results</h3>
                      <p className="text-gray-600">View your health reports</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentScreen('profile')}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
                      <p className="text-gray-600">Update your information</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Blood Test Results Ready</p>
                        <p className="text-sm text-gray-600">January 10, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Van arriving soon</p>
                        <p className="text-sm text-gray-600">Tomorrow at 10:00 AM</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Track
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Appointment</h3>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TestTube className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Blood Test</h4>
                  <p className="text-gray-600 mb-2">January 15, 2024</p>
                  <p className="text-gray-600 mb-4">10:00 AM</p>
                  <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Tips</h3>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Stay Hydrated</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Drinking enough water is crucial for accurate blood test results. 
                  Aim for 8 glasses per day.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookingSelectScreen = () => renderMainLayout(
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Test</h1>
          <p className="text-gray-600">Choose the type of test you need</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step 1 of 4</span>
            <span>Select Test Type</span>
          </div>
          <Progress value={25} className="h-2" />
        </div>

        {/* Test Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {testTypes.map((test) => (
            <Card 
              key={test.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedTestType === test.id 
                  ? 'ring-2 ring-red-500 bg-red-50' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedTestType(test.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <test.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                      <p className="text-gray-600">{test.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">{test.price}</p>
                    {selectedTestType === test.id && (
                      <CheckCircle className="w-5 h-5 text-red-600 ml-auto mt-1" />
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{test.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Popular</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button 
            className="bg-red-600 hover:bg-red-700"
            disabled={!selectedTestType}
            onClick={() => setCurrentScreen('booking-address')}
          >
            Continue to Location
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderBookingAddressScreen = () => renderMainLayout(
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => setCurrentScreen('booking-select')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to test selection
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Location</h1>
          <p className="text-gray-600">Where would you like us to come?</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step 2 of 4</span>
            <span>Service Location</span>
          </div>
          <Progress value={50} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Address Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Address</CardTitle>
                <CardDescription>
                  Our mobile lab will come directly to this location
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Main Street"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      placeholder="San Francisco"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input 
                      id="zip" 
                      placeholder="94102"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                  <textarea 
                    id="instructions" 
                    className="mt-1 w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Apartment number, gate code, parking instructions, etc."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Saved Addresses */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Select</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full justify-start p-4 h-auto"
                  onClick={() => setAddress('123 Main St, San Francisco, CA 94102')}
                >
                  <Home className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Home</p>
                    <p className="text-sm text-gray-600">123 Main St, San Francisco, CA</p>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Location Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Globe className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive map will appear here</p>
                    <p className="text-sm">Showing your selected location</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline"
            onClick={() => setCurrentScreen('booking-select')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700"
            disabled={!address}
            onClick={() => setCurrentScreen('booking-datetime')}
          >
            Continue to Date & Time
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderBookingDateTimeScreen = () => renderMainLayout(
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => setCurrentScreen('booking-address')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to location
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Date & Time</h1>
          <p className="text-gray-600">Choose when you'd like your test appointment</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step 3 of 4</span>
            <span>Date & Time</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Time Slots */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Available Times</CardTitle>
                <CardDescription>
                  All times are in your local timezone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTimeSlot === time ? "default" : "outline"}
                      className={selectedTimeSlot === time ? 'bg-red-600 hover:bg-red-700' : ''}
                      onClick={() => setSelectedTimeSlot(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Clock3 className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">What to expect</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Our van will arrive 15 minutes early to set up. You'll receive 
                      real-time updates on arrival time and can track the van's location.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline"
            onClick={() => setCurrentScreen('booking-address')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700"
            disabled={!selectedDate || !selectedTimeSlot}
            onClick={() => setCurrentScreen('booking-payment')}
          >
            Continue to Payment
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderBookingPaymentScreen = () => renderMainLayout(
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => setCurrentScreen('booking-datetime')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to date & time
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment</h1>
          <p className="text-gray-600">Secure payment processing</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step 4 of 4</span>
            <span>Payment</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-green-700">
                  <Shield className="w-4 h-4" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input 
                    id="cardholderName" 
                    placeholder="John Doe"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TestTube className="w-5 h-5 text-red-600" />
                  <span className="font-medium">Blood Test</span>
                </div>
                <span className="font-medium">$89.00</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>$89.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span>$15.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>$104.00</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Appointment Details</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📅 January 15, 2024 at 10:00 AM</p>
                  <p>📍 123 Main St, San Francisco, CA</p>
                  <p>🩸 Blood Test (15 minutes)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline"
            onClick={() => setCurrentScreen('booking-datetime')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700"
            onClick={() => setCurrentScreen('booking-confirmation')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Pay $104.00
          </Button>
        </div>
      </div>
    </div>
  );

  const renderBookingConfirmationScreen = () => renderMainLayout(
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Booking Confirmed! 🎉
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Your test has been scheduled successfully. We'll see you soon!
        </p>

        {/* Booking Details */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <TestTube className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Test Type</h4>
                  <p className="text-gray-600">Blood Test</p>
                </div>
                
                <div className="text-center">
                  <CalendarIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Date & Time</h4>
                  <p className="text-gray-600">Jan 15, 2024</p>
                  <p className="text-gray-600">10:00 AM</p>
                </div>
                
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">Location</h4>
                  <p className="text-gray-600">123 Main St</p>
                  <p className="text-gray-600">San Francisco, CA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Van Arrival Info */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <Car className="w-8 h-8 text-blue-600" />
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Van Arrival</h4>
                <p className="text-gray-600">Our team will arrive at 9:45 AM to set up</p>
                <p className="text-sm text-gray-500">You'll receive SMS updates when we're nearby</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline"
            onClick={() => setCurrentScreen('appointments')}
          >
            <Edit className="w-4 h-4 mr-2" />
            Manage Booking
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700"
            onClick={() => setCurrentScreen('home')}
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAppointmentsScreen = () => renderMainLayout(
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">View and manage your scheduled tests</p>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {mockAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TestTube className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{appointment.testType}</h3>
                      <p className="text-gray-600">{appointment.date} at {appointment.time}</p>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {appointment.address}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge 
                      variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}
                    >
                      {appointment.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      {appointment.status === 'upcoming' && (
                        <>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </>
                      )}
                      {appointment.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          View Results
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {appointment.status === 'upcoming' && appointment.arrivalTime && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Van arrives at {appointment.arrivalTime}</p>
                        <p className="text-sm text-green-700">Countdown: 2 hours 30 minutes remaining</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button 
            className="bg-red-600 hover:bg-red-700"
            onClick={() => setCurrentScreen('booking-select')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Book Another Test
          </Button>
        </div>
      </div>
    </div>
  );

  const renderResultsScreen = () => renderMainLayout(
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Results</h1>
          <p className="text-gray-600">View your health reports and test results</p>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {mockResults.map((result) => (
            <Card key={result.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      result.status === 'ready' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {result.status === 'ready' 
                        ? <CheckCircle className="w-6 h-6 text-green-600" />
                        : <Clock className="w-6 h-6 text-yellow-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{result.testType}</h3>
                      <p className="text-gray-600 mb-2">{result.date}</p>
                      
                      {result.summary && (
                        <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                          <p className="text-gray-700">{result.summary}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge 
                      variant={result.status === 'ready' ? 'default' : 'secondary'}
                      className={result.status === 'ready' ? 'bg-green-600' : 'bg-yellow-600'}
                    >
                      {result.status === 'ready' ? 'Ready' : 'Processing'}
                    </Badge>
                    
                    {result.status === 'ready' && result.pdfUrl && (
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    )}
                  </div>
                </div>

                {result.status === 'processing' && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-900">Processing in progress</p>
                        <p className="text-sm text-yellow-700">Estimated completion: 24-48 hours</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfileScreen = () => renderMainLayout(
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Sarah" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Johnson" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="sarah.johnson@email.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" className="mt-1" />
                </div>
                <Button className="bg-red-600 hover:bg-red-700">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Home className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Home</p>
                        <p className="text-sm text-gray-600">123 Main St, San Francisco, CA</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                <p className="text-gray-600">Premium Member</p>
                <Badge className="mt-2">Active</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Stats</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                    <p className="text-sm text-gray-600">Tests Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">98%</p>
                    <p className="text-sm text-gray-600">Health Score</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">5.0</p>
                    <p className="text-sm text-gray-600">Experience Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Notification Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Help & Support
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => setCurrentScreen('login')}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'login':
        return renderLoginScreen();
      case 'signup':
        return renderSignupScreen();
      case 'home':
        return renderHomeScreen();
      case 'booking-select':
        return renderBookingSelectScreen();
      case 'booking-address':
        return renderBookingAddressScreen();
      case 'booking-datetime':
        return renderBookingDateTimeScreen();
      case 'booking-payment':
        return renderBookingPaymentScreen();
      case 'booking-confirmation':
        return renderBookingConfirmationScreen();
      case 'appointments':
        return renderAppointmentsScreen();
      case 'results':
        return renderResultsScreen();
      case 'profile':
        return renderProfileScreen();
      default:
        return renderLoginScreen();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentScreen()}
    </div>
  );
}