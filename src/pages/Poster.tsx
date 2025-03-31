
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Cloud, 
  Shield, 
  DollarSign, 
  Server, 
  CheckCircle, 
  ArrowRight, 
  BarChart4,
  Globe
} from "lucide-react";

const Poster = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* A4 Landscape Poster (297mm x 210mm - using pixel equivalent) */}
      <div 
        className="relative w-[1123px] h-[794px] bg-white shadow-xl overflow-hidden"
        style={{ 
          aspectRatio: '1.414/1',
          backgroundImage: 'linear-gradient(to bottom right, #1A1F2C, #393B56)'
        }}
      >
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[120px] -z-0" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-400/10 blur-[100px] -z-0" />
        
        {/* Content Container */}
        <div className="relative z-10 w-full h-full p-10 text-white flex flex-col">
          
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold tracking-tight mb-2">
              Smart Data, <span className="text-blue-300">Smarter Savings</span>
            </h1>
            <h2 className="text-3xl font-medium text-gray-200">
              Cost-Effective Storage Solutions for Small Businesses
            </h2>
          </div>
          
          {/* Main Content - Two Columns Layout */}
          <div className="flex flex-1 gap-8">
            {/* Left Column */}
            <div className="w-[60%] flex flex-col gap-6">
              
              {/* Problem Statement */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <h3 className="text-2xl font-semibold mb-3 flex items-center">
                  <Database className="mr-2 h-6 w-6 text-blue-300" />
                  Challenges of Data Storage
                </h3>
                <p className="text-lg text-gray-200">
                  Small businesses generate increasing amounts of digital data but often
                  struggle with expensive, complex, or insecure storage solutions.
                </p>
                
                {/* Key Challenges */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-14 w-14 rounded-full bg-blue-400/20 flex items-center justify-center mb-2">
                      <DollarSign className="h-8 w-8 text-blue-300" />
                    </div>
                    <span className="font-medium">High Costs</span>
                    <span className="text-sm text-gray-300">Paying for unused space</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="h-14 w-14 rounded-full bg-blue-400/20 flex items-center justify-center mb-2">
                      <Shield className="h-8 w-8 text-blue-300" />
                    </div>
                    <span className="font-medium">Security Risks</span>
                    <span className="text-sm text-gray-300">Data breaches & loss</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="h-14 w-14 rounded-full bg-blue-400/20 flex items-center justify-center mb-2">
                      <Globe className="h-8 w-8 text-blue-300" />
                    </div>
                    <span className="font-medium">Accessibility</span>
                    <span className="text-sm text-gray-300">Remote access issues</span>
                  </div>
                </div>
              </div>
              
              {/* Solution Comparison */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 flex-1">
                <h3 className="text-2xl font-semibold mb-4">Storage Solution Comparison</h3>
                
                <div className="grid grid-cols-3 gap-6">
                  {/* Cloud Storage */}
                  <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-300/30">
                    <div className="mb-3 flex justify-center">
                      <Cloud className="h-12 w-12 text-blue-300" />
                    </div>
                    <h4 className="text-center text-xl font-medium mb-2">Cloud Storage</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span>Low monthly cost</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span>Automatic backups</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span>Access anywhere</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Local Servers */}
                  <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-300/30">
                    <div className="mb-3 flex justify-center">
                      <Server className="h-12 w-12 text-blue-300" />
                    </div>
                    <h4 className="text-center text-xl font-medium mb-2">Local Servers</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span>Full control</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span>One-time hardware cost</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span>No subscription fees</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Hybrid Solutions */}
                  <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-300/30 ring-2 ring-blue-400/50">
                    <div className="mb-3 flex justify-center relative">
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        RECOMMENDED
                      </div>
                      <div className="flex">
                        <Server className="h-12 w-12 text-blue-300" />
                        <Cloud className="h-12 w-12 text-blue-300 ml-2" />
                      </div>
                    </div>
                    <h4 className="text-center text-xl font-medium mb-2">Hybrid Solutions</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span>Best of both worlds</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span>Enhanced security</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        <span>Flexible scaling</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-300">
                  <p>* Based on average requirements for small businesses with 5-50 employees</p>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="w-[40%]">
              
              {/* Price vs Security Chart */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 mb-6">
                <h3 className="text-2xl font-semibold mb-4">Price vs. Security</h3>
                
                <div className="aspect-square relative border-b border-l border-gray-300 p-4">
                  {/* Axes labels */}
                  <div className="absolute -left-10 top-1/2 -rotate-90 text-sm text-gray-300">Cost</div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-sm text-gray-300">Security</div>
                  
                  {/* Data points */}
                  <div className="absolute left-[20%] bottom-[30%] w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center" title="Cloud Storage">
                    <Cloud className="h-10 w-10 text-blue-300" />
                  </div>
                  
                  <div className="absolute left-[60%] bottom-[65%] w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center" title="Local Servers">
                    <Server className="h-10 w-10 text-blue-300" />
                  </div>
                  
                  <div className="absolute left-[70%] bottom-[45%] w-24 h-24 rounded-full bg-green-500/30 ring-2 ring-green-400 flex items-center justify-center" title="Hybrid Solution">
                    <div className="flex">
                      <Server className="h-8 w-8 text-blue-300" />
                      <Cloud className="h-8 w-8 text-blue-300 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Benefits Section */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <h3 className="text-2xl font-semibold mb-4">Benefits of Cost-Effective Solutions</h3>
                
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                      <Shield className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Enhanced Security</h4>
                      <p className="text-sm text-gray-300">Protect sensitive data with encryption</p>
                    </div>
                  </li>
                  
                  <li className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                      <BarChart4 className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Scalable Solutions</h4>
                      <p className="text-sm text-gray-300">Grow your storage as your business expands</p>
                    </div>
                  </li>
                  
                  <li className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                      <DollarSign className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Cost Optimization</h4>
                      <p className="text-sm text-gray-300">Pay only for what you need</p>
                    </div>
                  </li>
                  
                  <li className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                      <Globe className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Anywhere Access</h4>
                      <p className="text-sm text-gray-300">Work remotely with secure data access</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Footer CTA */}
          <div className="mt-8 flex justify-between items-center bg-blue-900/50 p-6 rounded-lg">
            <div>
              <h3 className="text-2xl font-bold">Secure Your Business Data Without Breaking the Bank!</h3>
              <p className="text-gray-300">Scan QR code for our free guide on optimizing your storage costs</p>
            </div>
            
            <div className="flex items-center">
              <Button 
                onClick={() => {}}
                className="bg-blue-600 hover:bg-blue-500 mr-4"
                size="lg"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              {/* QR Code Placeholder */}
              <div className="bg-white p-2 rounded-md">
                <div className="w-20 h-20 bg-[url('/lovable-uploads/cc032e03-5246-4f70-8c35-c5917277b0d0.png')] bg-contain bg-center bg-no-repeat">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back Button */}
      <Button 
        variant="outline" 
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 bg-white/80"
      >
        Back to Home
      </Button>
    </div>
  );
};

export default Poster;
