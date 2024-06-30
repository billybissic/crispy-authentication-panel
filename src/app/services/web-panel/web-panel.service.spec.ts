import { TestBed } from '@angular/core/testing';

import { WebPanelService } from './web-panel.service';

describe('WebPanelService', () => {
  let service: WebPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
