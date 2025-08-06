import axios, { AxiosInstance, AxiosResponse } from 'axios';
import type {
  Fund,
  User,
  UserBalance,
  Transaction,
  UserFund,
  NotificationPreferences,
  ApiResponse,
  NotificationPreferencesFormData,
} from '@/types';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('❌ API Response Error:', error);
        return Promise.reject(error);
      }
    );
  }

  // Funds API
  async getFunds(): Promise<Fund[]> {
    const response: AxiosResponse<ApiResponse<Fund[]>> = await this.client.get('/funds/');
    return response.data.data || [];
  }

  async getFund(fundId: string): Promise<Fund> {
    const response: AxiosResponse<ApiResponse<Fund>> = await this.client.get(`/funds/${fundId}/`);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Fund not found');
    }
    return response.data.data;
  }

  async subscribeToFund(fundId: string): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await this.client.post(
      `/funds/${fundId}/subscribe/`
    );
    return response.data;
  }

  async cancelFundSubscription(fundId: string): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await this.client.post(
      `/funds/${fundId}/cancel/`
    );
    return response.data;
  }

  // User API
  async getUser(): Promise<User> {
    const response: AxiosResponse<ApiResponse<User>> = await this.client.get('/user/');
    if (!response.data.data) {
      throw new Error(response.data.message || 'User not found');
    }
    return response.data.data;
  }

  async getUserBalance(): Promise<UserBalance> {
    const response: AxiosResponse<ApiResponse<UserBalance>> = await this.client.get('/user/balance/');
    if (!response.data.data) {
      throw new Error(response.data.message || 'Balance not found');
    }
    return response.data.data;
  }

  async getUserFunds(): Promise<UserFund[]> {
    const response: AxiosResponse<ApiResponse<UserFund[]>> = await this.client.get('/user/funds/');
    return response.data.data || [];
  }

  async getUserTransactions(limit: number = 10): Promise<Transaction[]> {
    const response: AxiosResponse<ApiResponse<Transaction[]>> = await this.client.get(
      `/user/transactions/?limit=${limit}`
    );
    return response.data.data || [];
  }

  // Notifications API
  async getNotificationPreferences(): Promise<NotificationPreferences> {
    const response: AxiosResponse<ApiResponse<NotificationPreferences>> = await this.client.get(
      '/user/notifications/'
    );
    if (!response.data.data) {
      throw new Error(response.data.message || 'Notification preferences not found');
    }
    return response.data.data;
  }

  async updateNotificationPreferences(
    data: NotificationPreferencesFormData
  ): Promise<NotificationPreferences> {
    const response: AxiosResponse<ApiResponse<NotificationPreferences>> = await this.client.put(
      '/user/notifications/update/',
      data
    );
    if (!response.data.data) {
      throw new Error(response.data.message || 'Failed to update notification preferences');
    }
    return response.data.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export individual API functions for easier use
export const fundsApi = {
  getFunds: () => apiClient.getFunds(),
  getFund: (fundId: string) => apiClient.getFund(fundId),
  subscribe: (fundId: string) => apiClient.subscribeToFund(fundId),
  cancel: (fundId: string) => apiClient.cancelFundSubscription(fundId),
};

export const userApi = {
  getUser: () => apiClient.getUser(),
  getBalance: () => apiClient.getUserBalance(),
  getFunds: () => apiClient.getUserFunds(),
  getTransactions: (limit?: number) => apiClient.getUserTransactions(limit),
};

export const notificationsApi = {
  getPreferences: () => apiClient.getNotificationPreferences(),
  updatePreferences: (data: NotificationPreferencesFormData) =>
    apiClient.updateNotificationPreferences(data),
};
