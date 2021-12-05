/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaxiService } from './taxi.service';

describe('Service: Taxi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxiService]
    });
  });

  it('should ...', inject([TaxiService], (service: TaxiService) => {
    expect(service).toBeTruthy();
  }));
});
