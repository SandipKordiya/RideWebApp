/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FareEstimateService } from './fare-estimate.service';

describe('Service: FareEstimate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FareEstimateService]
    });
  });

  it('should ...', inject([FareEstimateService], (service: FareEstimateService) => {
    expect(service).toBeTruthy();
  }));
});
