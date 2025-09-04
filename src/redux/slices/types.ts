import { ResponseType } from 'axios';

// slices/types.ts
export interface AuthState {
  login: {
    token: string | null;
    expiresAt: number | null;
    status: boolean;
    error: string | null;
  };
}

export interface RootState {
  auth: AuthState;
}

export interface AsyncData {
  data: any | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginData {
  token: string | null;
  data: any | null;
  expiresAt: number | null;
  isLoading: boolean;
  error: string | null;
}

export interface DownloadRequestParams {
  type: string;
  startDate: string;
  endDate: string;
  responseType?: ResponseType;
}

export interface InitialState {
  login: LoginData;
  profile: AsyncData;
  admins: AsyncData;
  admin: AsyncData;
}

export interface DashboardInitialState {
  riders: AsyncData;
  singleRider: AsyncData;
  singleRiderHistory: AsyncData;
  drivers: AsyncData;
  singleDriver: AsyncData;
  singleDriverHistory: AsyncData;
  downloadRequest: AsyncData;
  marketers: AsyncData;
  singleMarketer: AsyncData;
  requests: AsyncData;
  singleMarketerHistory: AsyncData;
  statistics: {
    total: any | null;
    topMarketers: any | null;
    modeOfTransporation: any | null;
    activeRiders: any | null;
    requestComparison: any | null;
    isLoading: boolean;
    error: string | null;
  };
}
