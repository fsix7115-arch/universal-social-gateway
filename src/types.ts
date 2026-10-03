export type ConnectorId = string;
export type AccountId = string;

export interface ConnectorCapabilities {
  login: boolean;
  publishPost: boolean;
  publishMedia: boolean;
  comment: boolean;
  scheduling: boolean;
  browserAutomation: boolean;
  officialApi: boolean;
}

export interface SocialConnector {
  id: ConnectorId;
  name: string;
  capabilities: ConnectorCapabilities;
  connect(account: AccountConnection): Promise<ConnectorStatus>;
  post(request: PostRequest): Promise<TaskResult>;
  comment(request: CommentRequest): Promise<TaskResult>;
  healthCheck(): Promise<boolean>;
}

export interface AccountConnection {
  id: AccountId;
  platform: string;
  displayName: string;
  credentials: Record<string, any>;
  sessionData?: string;
  status: 'connected' | 'disconnected' | 'error';
}

export interface PostRequest {
  text: string;
  media?: string[];
  scheduledAt?: Date;
}

export interface CommentRequest {
  targetId: string;
  text: string;
}

export interface TaskResult {
  success: boolean;
  taskId: string;
  externalId?: string;
  message?: string;
  timestamp: Date;
}

export interface ConnectorStatus {
  connected: boolean;
  message?: string;
  lastChecked: Date;
}
