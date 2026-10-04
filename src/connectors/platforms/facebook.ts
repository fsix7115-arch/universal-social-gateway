export class FacebookConnector { id = 'facebook'; async post(r: any) { return { success: false, taskId: 'x', message: 'Pending API', timestamp: new Date() }; } }
