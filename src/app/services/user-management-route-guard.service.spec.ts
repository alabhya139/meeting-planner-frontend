import { TestBed } from '@angular/core/testing';

import { UserManagementRouteGuardService } from './user-management-route-guard.service';

describe('UserManagementRouteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserManagementRouteGuardService = TestBed.get(UserManagementRouteGuardService);
    expect(service).toBeTruthy();
  });
});
