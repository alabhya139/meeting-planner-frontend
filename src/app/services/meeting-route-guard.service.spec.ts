import { TestBed } from '@angular/core/testing';

import { MeetingRouteGuardService } from './meeting-route-guard.service';

describe('MeetingRouteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeetingRouteGuardService = TestBed.get(MeetingRouteGuardService);
    expect(service).toBeTruthy();
  });
});
