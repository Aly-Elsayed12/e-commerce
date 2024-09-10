import { TestBed } from '@angular/core/testing';

import { MyTransalteService } from './my-transalte.service';

describe('MyTransalteService', () => {
  let service: MyTransalteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTransalteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
