// This file provides both mock implementations and real API implementations
// for Plaid integration. The real implementations will call your backend API.

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

// Configuration for API endpoints
const API_CONFIG = {
  // Set this to false by default, users can enable it when ready
  USE_REAL_API: false,
  // Default to localhost:8000, but can be configured
  API_URL: 'http://localhost:8000/api',
};

// Function to call your backend API
const callBackendApi = async (endpoint: string, method: string = 'GET', data?: any) => {
  if (!API_CONFIG.USE_REAL_API) {
    console.warn('Using mock API implementation. Set USE_REAL_API to true when backend is ready.');
    return null;
  }

  try {
    console.log(`Making ${method} request to ${API_CONFIG.API_URL}/${endpoint}`, data);
    
    const response = await fetch(`${API_CONFIG.API_URL}/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include', // Include cookies for session-based auth if needed
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(`API response from ${endpoint}:`, responseData);
    return responseData;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Exchange a public token for an access token
export const exchangePublicToken = async (publicToken: string): Promise<string> => {
  console.log("Exchanging public token:", publicToken);
  
  // If real API is enabled, use it
  if (API_CONFIG.USE_REAL_API) {
    try {
      const data = await callBackendApi('plaid/exchange_token', 'POST', { public_token: publicToken });
      return data.access_token;
    } catch (error) {
      console.error("Failed to exchange token with real API:", error);
      // If the real API fails, fall back to mock for demo purposes
      console.warn("Falling back to mock implementation for token exchange");
    }
  }
  
  // Otherwise use mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock access token - in reality this would come from Plaid via your backend
      const mockAccessToken = "access-sandbox-" + Math.random().toString(36).substring(2, 15);
      console.log("Received mock access token:", mockAccessToken);
      resolve(mockAccessToken);
    }, 1000);
  });
};

// Fetch accounts for a user
export const fetchAccounts = async (accessToken: string): Promise<PlaidAccount[]> => {
  console.log("Fetching accounts with access token:", accessToken);
  
  // If real API is enabled, use it
  if (API_CONFIG.USE_REAL_API) {
    try {
      const data = await callBackendApi('plaid/accounts', 'POST', { access_token: accessToken });
      return data.accounts;
    } catch (error) {
      console.error("Failed to fetch accounts with real API:", error);
      // If the real API fails, fall back to mock for demo purposes
      console.warn("Falling back to mock implementation for accounts");
    }
  }
  
  // Otherwise use mock implementation
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

// Fetch transactions for a user
export const fetchTransactions = async (
  accessToken: string,
  startDate: string,
  endDate: string
): Promise<PlaidTransaction[]> => {
  console.log("Fetching transactions with access token:", accessToken);
  
  // If real API is enabled, use it
  if (API_CONFIG.USE_REAL_API) {
    try {
      const data = await callBackendApi('plaid/transactions', 'POST', { 
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate
      });
      return data.transactions;
    } catch (error) {
      console.error("Failed to fetch transactions with real API:", error);
      // If the real API fails, fall back to mock for demo purposes
      console.warn("Falling back to mock implementation for transactions");
    }
  }
  
  // Otherwise use mock implementation
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

// Check if the backend API is configured and available
export const checkBackendConnection = async (): Promise<boolean> => {
  if (!API_CONFIG.USE_REAL_API) {
    return false;
  }
  
  try {
    // Try to connect to the health endpoint
    console.log(`Checking backend connection at ${API_CONFIG.API_URL}/health`);
    await callBackendApi('health');
    console.log("Backend connection successful");
    return true;
  } catch (error) {
    console.error('Backend connection check failed:', error);
    return false;
  }
};

// Set API configuration - call this when initializing your app
// with configuration from environment variables or similar
export const configurePlaidApi = (useRealApi: boolean, apiUrl?: string) => {
  console.log(`Configuring Plaid API: useRealApi=${useRealApi}, apiUrl=${apiUrl || API_CONFIG.API_URL}`);
  
  API_CONFIG.USE_REAL_API = useRealApi;
  if (apiUrl) {
    API_CONFIG.API_URL = apiUrl;
  }
  
  console.log(`Plaid API configured: ${useRealApi ? 'Using real API' : 'Using mock API'}`);
};

// Create a link token via the backend
export const createLinkToken = async (): Promise<string> => {
  console.log("Creating link token, useRealApi:", API_CONFIG.USE_REAL_API);
  
  if (API_CONFIG.USE_REAL_API) {
    try {
      const data = await callBackendApi('plaid/create_link_token', 'POST');
      console.log("Received real link token:", data.link_token);
      return data.link_token;
    } catch (error) {
      console.error("Failed to create link token with real API:", error);
      // If the real API fails, fall back to mock for demo purposes
      console.warn("Falling back to mock implementation for link token");
    }
  }
  
  // Mock link token for development
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockLinkToken = "link-sandbox-" + Math.random().toString(36).substring(2, 15);
      console.log("Created mock link token:", mockLinkToken);
      resolve(mockLinkToken);
    }, 1000);
  });
};
