import { TestBed } from '@angular/core/testing';

import { QuizAppService } from './quiz-app.service';

describe('QuizAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizAppService = TestBed.get(QuizAppService);
    expect(service).toBeTruthy();
  });
});
