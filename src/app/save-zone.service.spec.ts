import { TestBed } from '@angular/core/testing';

import { SaveZoneService } from './save-zone.service';

describe('SaveZoneService', () => {
  let service: SaveZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
