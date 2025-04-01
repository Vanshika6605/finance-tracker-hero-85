
import { useState } from "react";
import { exchangePublicToken, fetchAccounts, PlaidAccount, PlaidLinkMetadata } from "@/services/plaidService";
import { toast } from "sonner";

interface UsePlaidLinkResult {
  isLinking: boolean;
  linkedAccounts: PlaidAccount[];
  handlePlaidSuccess: (publicToken: string, metadata: PlaidLinkMetadata) => Promise<void>;
  refreshAccounts: () => Promise<void>;
}

// This hook manages the Plaid Link flow and account data
export const usePlaidLink = (): UsePlaidLinkResult => {
  const [isLinking, setIsLinking] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [linkedAccounts, setLinkedAccounts] = useState<PlaidAccount[]>([]);

  // Handle successful Plaid Link completion
  const handlePlaidSuccess = async (publicToken: string, metadata: PlaidLinkMetadata) => {
    try {
      setIsLinking(true);
      console.log("Plaid Link successful:", { publicToken, metadata });
      
      // Exchange public token for access token
      const token = await exchangePublicToken(publicToken);
      setAccessToken(token);
      
      // Store in localStorage for demo purposes (in a real app, this would be on your server)
      localStorage.setItem("plaid_access_token", token);
      
      // Fetch accounts with the new access token
      const accounts = await fetchAccounts(token);
      setLinkedAccounts(accounts);
      
      // If we have institution metadata, let's log it
      if (metadata?.institution) {
        console.log("Linked institution:", metadata.institution);
        // In a real app, you might want to store this information as well
      }
      
    } catch (error) {
      console.error("Error in Plaid Link flow:", error);
      toast.error("There was a problem linking your account. Please try again.");
    } finally {
      setIsLinking(false);
    }
  };
  
  // Function to refresh account data
  const refreshAccounts = async () => {
    if (!accessToken) {
      // Try to get from localStorage for demo purposes
      const storedToken = localStorage.getItem("plaid_access_token");
      if (!storedToken) {
        console.warn("No access token available to refresh accounts");
        return;
      }
      setAccessToken(storedToken);
    }
    
    try {
      setIsLinking(true);
      const token = accessToken || localStorage.getItem("plaid_access_token");
      if (token) {
        const accounts = await fetchAccounts(token);
        setLinkedAccounts(accounts);
      }
    } catch (error) {
      console.error("Error refreshing accounts:", error);
      toast.error("Failed to refresh account information");
    } finally {
      setIsLinking(false);
    }
  };

  return {
    isLinking,
    linkedAccounts,
    handlePlaidSuccess,
    refreshAccounts
  };
};
