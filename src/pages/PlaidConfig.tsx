
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { usePlaidLink } from "@/hooks/usePlaidLink";
import { Settings, Server, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const PlaidConfig = () => {
  const [apiUrl, setApiUrl] = useState("http://localhost:8000/api");
  const [useRealApi, setUseRealApi] = useState(false);
  const navigate = useNavigate();
  
  const { configureBackend, isBackendConnected } = usePlaidLink();

  // Apply current configuration on mount
  useEffect(() => {
    // Check if there's a stored configuration
    const storedApiUrl = localStorage.getItem("plaid_api_url");
    const storedUseRealApi = localStorage.getItem("plaid_use_real_api") === "true";
    
    if (storedApiUrl) {
      setApiUrl(storedApiUrl);
    }
    
    if (storedUseRealApi) {
      setUseRealApi(storedUseRealApi);
    }
    
    // Apply the configuration (either stored or default)
    handleSaveConfig(storedApiUrl || apiUrl, storedUseRealApi);
  }, []);

  const handleSaveConfig = (url = apiUrl, useReal = useRealApi) => {
    // Save to localStorage
    localStorage.setItem("plaid_api_url", url);
    localStorage.setItem("plaid_use_real_api", useReal.toString());
    
    // Configure the Plaid API
    configureBackend(useReal, url);
    
    // Show toast notification
    toast.success("Plaid API configuration saved");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 px-4 sm:px-6 md:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold flex items-center">
              <Settings className="mr-2 h-5 w-5" /> 
              Plaid API Configuration
            </h1>
            <p className="text-gray-500 mt-1">
              Configure your Plaid API connection settings
            </p>
          </div>
          
          <Card className="shadow-sm border border-gray-200 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5 text-primary" />
                Backend Connection
              </CardTitle>
              <CardDescription>
                Connection status to your Plaid backend server
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {isBackendConnected ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {isBackendConnected ? "Connected" : "Not Connected"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isBackendConnected 
                      ? "Your app is successfully connected to your Plaid backend API"
                      : "Not connected to backend API. Using mock implementation."
                    }
                  </p>
                </div>
              </div>
              
              {!isBackendConnected && useRealApi && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-yellow-800">Warning: Using Mock Data</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Even though you've selected "Using Real API", you're still seeing mock data because:
                    </p>
                    <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
                      <li>Your backend server may not be running</li>
                      <li>The API URL might be incorrect</li>
                      <li>Your backend server isn't properly configured with Plaid</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>
                Configure how your app connects to the Plaid API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="api-mode">API Mode</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    id="api-mode"
                    checked={useRealApi}
                    onCheckedChange={setUseRealApi}
                  />
                  <Label htmlFor="api-mode" className="cursor-pointer">
                    {useRealApi ? "Using Real API" : "Using Mock API"}
                  </Label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {useRealApi 
                    ? "Your app will connect to your real Plaid API backend"
                    : "Your app will use mock data for development"
                  }
                </p>
              </div>
              
              {useRealApi && (
                <div className="space-y-1">
                  <Label htmlFor="api-url">API URL</Label>
                  <Input
                    id="api-url"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="http://localhost:8000/api"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    The base URL of your Plaid backend API
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
              <Button onClick={() => handleSaveConfig()}>
                Save Configuration
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
};

export default PlaidConfig;
