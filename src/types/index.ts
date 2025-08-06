// Tipos para la API de fondos de inversión

export interface Fund {
  id: string;
  name: string;
  minimum_amount: string;
  category: 'FPV' | 'FIC';
  is_active: boolean;
}

export interface User {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  document_number: string;
  document_type: string;
  created_at: string;
  updated_at: string;
}

export interface UserBalance {
  user_id: string;
  available_balance: string;
  formatted_balance: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  fund_id: string;
  fund_name: string;
  transaction_type: 'SUBSCRIPTION' | 'CANCELLATION';
  transaction_type_display: string;
  amount: string;
  formatted_amount: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  created_at: string;
  notification_sent: boolean;
}

export interface UserFund {
  subscription: {
    user_id: string;
    fund_id: string;
    subscribed_at: string;
    active: boolean;
    subscription_amount: string;
    invested_amount: string;
  };
  fund: Fund;
}

export interface NotificationPreferences {
  user_id: string;
  notification_type: 'email' | 'sms';
  email_enabled: boolean;
  sms_enabled: boolean;
  email_address?: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
}

// Tipos para respuestas de la API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
  details?: Record<string, any>;
}

// Tipos para formularios
export interface SubscriptionFormData {
  fund_id: string;
}

export interface NotificationPreferencesFormData {
  notification_type: 'email' | 'sms';
}

// Tipos para estados de loading
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Tipos para el contexto de la aplicación
export interface AppContextType {
  user: User | null;
  balance: UserBalance | null;
  funds: Fund[];
  userFunds: UserFund[];
  transactions: Transaction[];
  notificationPreferences: NotificationPreferences | null;
  refreshData: () => Promise<void>;
  isLoading: boolean;
}
