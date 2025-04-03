
// Global TypeScript definitions

// Add Plaid Link to window object type
interface Window {
  Plaid?: {
    create: (config: {
      token: string;
      onSuccess: (public_token: string, metadata: any) => void;
      onLoad: () => void;
      onExit: (err: any, metadata: any) => void;
      onEvent: (eventName: string, metadata: any) => void;
    }) => {
      open: () => void;
    };
  };
}
