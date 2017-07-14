import { InMemoryDbService } from 'angular-in-memory-web-api';
export class MockData implements InMemoryDbService {
  createDb() {
    let mockData = [
      { emailId: 'admin@scry.com', password: 'admin', name: 'Administrator' },
      { emailId: 'user1@scry.com', password: 'user1', name: 'User 1' },
      { emailId: 'user2@scry.com', password: 'user2', name: 'User 2' },
    ];
    return {mockData};
  }
}
