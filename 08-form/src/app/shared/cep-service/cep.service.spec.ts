import { TestBed } from '@angular/core/testing';

import { CepService } from './cep.service';

describe('CepServiceService', () => {
  let service: CepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
