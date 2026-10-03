import { SocialConnector, ConnectorCapabilities, AccountConnection, PostRequest, CommentRequest, TaskResult, ConnectorStatus } from '../types.js';
export class MockConnector implements SocialConnector {
  id = 'mock';
  name = 'Mock Connector';
  capabilities: ConnectorCapabilities = { login: true, publishPost: true, publishMedia: false, comment: true, scheduling: true, browserAutomation: false, officialApi: true };
  async connect(account: AccountConnection): Promise<ConnectorStatus> { return { connected: true, message: 'Mock connected', lastChecked: new Date() }; }
  async post(request: PostRequest): Promise<TaskResult> { return { success: true, taskId: 'Math.random().toString(36).substring(7)', message: 'Mock post successful: ' + request.text, timestamp: new Date() }; }
  async comment(request: CommentRequest): Promise<TaskResult> { return { success: true, taskId: 'mock-comment-1', message: 'Mock comment successful', timestamp: new Date() }; }
  async healthCheck(): Promise<boolean> { return true; }
}
