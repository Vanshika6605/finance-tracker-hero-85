
// This file simulates a service that would interact with your backend API,
// which would in turn communicate with Plaid's API

// Types for Plaid-related data
export interface PlaidAccount {
  id: string;
  name: string;
  type: string;
  subtype: string;
  mask: string;
  balance?: {
    available: number;
    current: number;
    limit?: number;
  };
}

export interface PlaidInstitution {
  name: string;
  institution_id: string;
  logo?: string;
}

export interface PlaidLinkMetadata {
  institution: PlaidInstitution;
  accounts: PlaidAccount[];
}

export interface PlaidTransaction {
  id: string;
  amount: number;
  date: string;
  name: string;
  merchant_name?: string;
  category: string[];
  pending: boolean;
  account_id: string;
}

// Mock function to exchange a public token for an access token
// In a real implementation, this would call your backend,
// which would call Plaid's /item/public_token/exchange endpoint
export const exchangePublicToken = async (publicToken: string): Promise<string> => {
  console.log("Exchanging public token:", publicToken);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock access token - in reality this would come from Plaid via your backend
      const mockAccessToken = "access-sandbox-" + Math.random().toString(36).substring(2, 15);
      console.log("Received access token:", mockAccessToken);
      resolve(mockAccessToken);
    }, 1000);
  });
};

// Mock function to fetch accounts for a user
// In a real implementation, this would call your backend,
// which would call Plaid's /accounts/get endpoint
export const fetchAccounts = async (accessToken: string): Promise<PlaidAccount[]> => {
  console.log("Fetching accounts with access token:", accessToken);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock accounts data
      const mockAccounts: PlaidAccount[] = [
        {
          id: "acc_1",
          name: "Checking Account",
          type: "depository",
          subtype: "checking",
          mask: "0123",
          balance: {
            available: 1250.45,
            current: 1274.93
          }
        },
        {
          id: "acc_2",
          name: "Savings Account",
          type: "depository",
          subtype: "savings",
          mask: "4567",
          balance: {
            available: 5340.23,
            current: 5340.23
          }
        },
        {
          id: "acc_3",
          name: "Credit Card",
          type: "credit",
          subtype: "credit card",
          mask: "8901",
          balance: {
            available: 2500,
            current: -450.21,
            limit: 3000
          }
        }
      ];
      
      resolve(mockAccounts);
    }, 1000);
  });
};

// Mock function to fetch transactions for a user
// In a real implementation, this would call your backend,
// which would call Plaid's /transactions/get endpoint
export const fetchTransactions = async (
  accessToken: string,
  startDate: string,
  endDate: string
): Promise<PlaidTransaction[]> => {
  console.log("Fetching transactions with access token:", accessToken);
  console.log("Date range:", startDate, "to", endDate);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate mock transactions
      const categories = [
        ["Food and Drink", "Restaurants"],
        ["Shops", "Grocery"],
        ["Transportation", "Ride Share"],
        ["Payment", "Credit Card"],
        ["Recreation", "Entertainment"],
        ["Service", "Subscription"]
      ];
      
      const merchants = [
        "Amazon",
        "Walmart",
        "Target",
        "Uber",
        "Netflix",
        "Spotify",
        "Whole Foods",
        "Starbucks",
        "Home Depot",
        "CVS Pharmacy"
      ];
      
      const mockTransactions: PlaidTransaction[] = Array.from({ length: 25 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random date in the last 30 days
        
        const category = categories[Math.floor(Math.random() * categories.length)];
        const merchant = merchants[Math.floor(Math.random() * merchants.length)];
        const amount = parseFloat((Math.random() * 200).toFixed(2));
        const account = ["acc_1", "acc_2", "acc_3"][Math.floor(Math.random() * 3)];
        
        return {
          id: `trans-${i}`,
          amount,
          date: date.toISOString().split('T')[0],
          name: `Purchase at ${merchant}`,
          merchant_name: merchant,
          category,
          pending: Math.random() < 0.1, // 10% chance of being pending
          account_id: account
        };
      }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      resolve(mockTransactions);
    }, 1500);
  });
};
