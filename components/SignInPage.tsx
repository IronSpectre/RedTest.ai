import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

interface SignInPageProps {
  onBack: () => void;
  onRegister: () => void;
  onSignIn: () => void;
}

export function SignInPage({ onBack, onRegister, onSignIn }: SignInPageProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      general: ""
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors({ email: "", password: "", general: "" });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate login check (in real app, this would be an API call)
    const isValidLogin = formData.email === "demo@redtest.ai" && formData.password === "password";
    
    if (isValidLogin) {
      console.log("Sign in successful:", formData);
      onSignIn();
    } else {
      setErrors({ 
        email: "", 
        password: "", 
        general: "Invalid email or password. Please try again." 
      });
    }
    
    setIsSubmitting(false);
  };

  const handleForgotPassword = () => {
    // In a real app, this would redirect to forgot password flow
    alert("Forgot password functionality would be implemented here. For demo, use: demo@redtest.ai / password");
  };



  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="mb-6 text-gray-600 hover:bg-red-600 hover:text-white transition-colors text-lg py-3 px-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sign In
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Welcome back to RedTest.ai - your AI health analysis platform
            </p>
          </div>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl md:text-3xl font-bold">Sign In to Your Account</CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-4">
              Enter your credentials to access your health data dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 md:px-12 pb-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-center">{errors.general}</p>
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="email" className="text-lg font-medium">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  placeholder="Enter your email address"
                  className={`h-12 text-lg px-4 border-2 focus:ring-red-500 ${
                    errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-lg font-medium">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                    placeholder="Enter your password"
                    className={`h-12 text-lg px-4 pr-12 border-2 focus:ring-red-500 ${
                      errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({...prev, rememberMe: checked as boolean}))
                    }
                    className="h-5 w-5 border-2 border-gray-300 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <Label htmlFor="rememberMe" className="text-lg font-normal cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-red-600 hover:text-red-700 text-lg font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-xl py-4 h-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-lg text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={onRegister}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Register your interest
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700 text-sm">
              <strong>Demo credentials:</strong> demo@redtest.ai / password
            </p>
          </div>
        </div>

        <div className="mt-12 text-center text-base text-gray-500">
          <p>
            By signing in, you agree to our privacy policy and terms of service. 
            Your health data is encrypted and secure.
          </p>
        </div>
      </div>
    </div>
  );
}