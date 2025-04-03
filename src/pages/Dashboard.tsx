
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";
import Navbar from "@/components/Navbar";
import PlaidLink from "@/components/PlaidLink";
import TransactionList, { Transaction } from "@/components/TransactionList";
import SpendingChart from "@/components/charts/SpendingChart";
import BalanceChart from "@/components/charts/BalanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, CreditCard, DollarSign, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Mock data for transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Mock data for charts
  const [spendingData, setSpendingData] = useState<any[]>([]);
  const [balanceData, setBalanceData] = useState<any[]>([]);
  
  // Mock account summary data
  const [accountSummary, setAccountSummary] = useState({
    totalBalance: 0,
    income: 0,
    expenses: 0,
    accounts: [] as {id: string, name: string, balance: number, type: string}[]
  });

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Simulate data loading
    const timer = setTimeout(() => {
      if (connected) {
        generateMockData();
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate, connected]);

  const handlePlaidSuccess = (public_token: string, metadata: any) => {
    console.log("Plaid connected successfully", { public_token, metadata });
    setConnected(true);
    setLoading(true);
    
    // Generate mock data after "connecting" to Plaid
    setTimeout(() => {
      generateMockData();
      setLoading(false);
    }, 1500);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      generateMockData();
      setRefreshing(false);
      toast.success("Financial data refreshed!");
    }, 1500);
  };

  const generateMockData = () => {
    // Generate mock transactions
    const mockCategories = ["Food & Dining", "Shopping", "Housing", "Transportation", "Travel", "Coffee", "Other"];
    const mockMerchants = [
      "Amazon", "Walmart", "Target", "Starbucks", "Uber", "Netflix", 
      "Spotify", "Apple", "Rent", "Electric Company", "Gas Station",
      "Grocery Store", "Restaurant", "Gym"
    ];
    const mockAccounts = ["Checking Account", "Savings Account", "Credit Card"];
    
    const newTransactions = Array.from({ length: 20 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      const type = Math.random() > 0.7 
        ? "income" 
        : Math.random() > 0.2 ? "expense" : "transfer";
      
      const amount = type === "income"
        ? Math.floor(Math.random() * 2000) + 500
        : type === "expense"
        ? -(Math.floor(Math.random() * 200) + 10)
        : Math.random() > 0.5 
          ? Math.floor(Math.random() * 500) + 100
          : -(Math.floor(Math.random() * 500) + 100);
      
      return {
        id: `trans-${i}`,
        date: date.toISOString(),
        merchant: mockMerchants[Math.floor(Math.random() * mockMerchants.length)],
        amount,
        category: mockCategories[Math.floor(Math.random() * mockCategories.length)],
        type: type as "income" | "expense" | "transfer",
        account: mockAccounts[Math.floor(Math.random() * mockAccounts.length)]
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setTransactions(newTransactions);
    
    // Generate spending by category
    const spendingByCategory = mockCategories.map(category => {
      const transactions = newTransactions.filter(t => 
        t.category === category && t.type === "expense"
      );
      
      const amount = Math.abs(transactions.reduce((sum, t) => sum + t.amount, 0));
      
      return {
        name: category,
        amount,
        category
      };
    }).filter(c => c.amount > 0).sort((a, b) => b.amount - a.amount);
    
    setSpendingData(spendingByCategory);
    
    // Generate balance history
    const today = new Date();
    const balanceHistory = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (29 - i));
      
      // Start with base and add some random fluctuation
      const baseBalance = 5000 + (i * 100);
      const randomFactor = Math.random() * 1000 - 500;
      
      return {
        date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date),
        balance: Math.max(0, baseBalance + randomFactor)
      };
    });
    
    setBalanceData(balanceHistory);
    
    // Generate account summary
    const totalIncome = newTransactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = Math.abs(newTransactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0));
    
    // Generate mock accounts
    const mockAccountsData = [
      { id: "acc1", name: "Checking", balance: 4578.23, type: "depository" },
      { id: "acc2", name: "Savings", balance: 12450.00, type: "depository" },
      { id: "acc3", name: "Credit Card", balance: -1243.45, type: "credit" }
    ];
    
    const totalBalance = mockAccountsData.reduce((sum, acc) => sum + acc.balance, 0);
    
    setAccountSummary({
      totalBalance,
      income: totalIncome,
      expenses: totalExpenses,
      accounts: mockAccountsData
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 px-4 sm:px-6 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {!connected ? (
            <div className="max-w-md mx-auto mt-16">
              <PlaidLink onSuccess={handlePlaidSuccess} />
            </div>
          ) : (
            <>
              {/* Account Summary */}
              <div className="mb-6 mt-8">
                <div className="flex flex-wrap justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Financial Dashboard</h1>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={handleRefresh}
                    disabled={refreshing}
                  >
                    {refreshing ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card className="shadow-sm border border-gray-200">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Balance</p>
                          <h3 className="text-2xl font-bold mt-1">
                            {loading ? (
                              <div className="h-8 w-28 rounded shimmer"></div>
                            ) : (
                              formatCurrency(accountSummary.totalBalance)
                            )}
                          </h3>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm border border-gray-200">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Income</p>
                          <h3 className="text-2xl font-bold mt-1 text-green-600">
                            {loading ? (
                              <div className="h-8 w-28 rounded shimmer"></div>
                            ) : (
                              formatCurrency(accountSummary.income)
                            )}
                          </h3>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                          <ArrowUp className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm border border-gray-200">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Expenses</p>
                          <h3 className="text-2xl font-bold mt-1 text-red-600">
                            {loading ? (
                              <div className="h-8 w-28 rounded shimmer"></div>
                            ) : (
                              formatCurrency(accountSummary.expenses)
                            )}
                          </h3>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
                          <ArrowDown className="h-5 w-5 text-red-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm border border-gray-200">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Accounts</p>
                          <h3 className="text-2xl font-bold mt-1">
                            {loading ? (
                              <div className="h-8 w-28 rounded shimmer"></div>
                            ) : (
                              accountSummary.accounts.length
                            )}
                          </h3>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-purple-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Accounts List */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Your Accounts</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs h-8 flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      Add Account
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {loading ? (
                      // Skeleton loaders for accounts
                      Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i} className="shadow-sm border border-gray-200">
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <div className="h-4 w-24 rounded shimmer"></div>
                                <div className="h-6 w-32 rounded shimmer"></div>
                              </div>
                              <div className="h-10 w-10 rounded-full shimmer"></div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      accountSummary.accounts.map(account => (
                        <Card 
                          key={account.id} 
                          className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-medium text-gray-500">{account.name}</p>
                                <h3 className={`text-xl font-semibold mt-1 ${account.balance < 0 ? 'text-red-600' : ''}`}>
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  }).format(account.balance)}
                                </h3>
                              </div>
                              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-blue-500" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
                
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <SpendingChart data={spendingData} />
                  <BalanceChart data={balanceData} />
                </div>
                
                {/* Recent Transactions */}
                <TransactionList 
                  transactions={transactions} 
                  loading={loading}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
