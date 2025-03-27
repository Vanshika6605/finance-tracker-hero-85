
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Link as LinkIcon } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";

interface PlaidLinkProps {
  onSuccess: (public_token: string, metadata: any) => void;
  className?: string;
}

const PlaidLink = ({ onSuccess, className }: PlaidLinkProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // This is a mock function to simulate opening the Plaid Link
  // In a real implementation, you would use the Plaid Link SDK
  const openPlaidLink = () => {
    setIsLoading(true);
    
    // Simulate a delay before "connecting" to Plaid
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock success response
      const mockPublicToken = "public-sandbox-" + Math.random().toString(36).substring(2, 15);
      const mockMetadata = {
        institution: { name: "Chase", institution_id: "ins_1" },
        accounts: [
          { id: "acc_1", name: "Checking Account", type: "depository", subtype: "checking", mask: "0123" },
          { id: "acc_2", name: "Savings Account", type: "depository", subtype: "savings", mask: "4567" },
          { id: "acc_3", name: "Credit Card", type: "credit", subtype: "credit card", mask: "8901" }
        ]
      };
      
      onSuccess(mockPublicToken, mockMetadata);
      toast.success("Connected to Chase Bank successfully!");
    }, 2000);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <LinkIcon className="mr-2 h-5 w-5 text-primary" />
          Connect Your Bank
        </CardTitle>
        <CardDescription>
          Link your bank accounts to track your finances automatically
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-700 mb-2">How It Works</h3>
            <ul className="text-sm text-blue-600 space-y-1">
              <li className="flex items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs mr-2">1</span>
                <span>Connect your bank accounts securely</span>
              </li>
              <li className="flex items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs mr-2">2</span>
                <span>We'll import your transactions automatically</span>
              </li>
              <li className="flex items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs mr-2">3</span>
                <span>Keep track of your finances in one place</span>
              </li>
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border rounded-lg text-center">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary opacity-80" />
              <p className="text-sm font-medium">Bank Accounts</p>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary opacity-80" />
              <p className="text-sm font-medium">Credit Cards</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={openPlaidLink} 
          className="w-full font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </>
          ) : (
            <>Connect Bank Account</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlaidLink;
