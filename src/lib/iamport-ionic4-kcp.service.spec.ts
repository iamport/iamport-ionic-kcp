import { TestBed } from '@angular/core/testing';

import { IamportService } from './iamport-ionic4-kcp.service';

describe('IamportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IamportService = TestBed.get(IamportService);
    expect(service).toBeTruthy();
  });
});
