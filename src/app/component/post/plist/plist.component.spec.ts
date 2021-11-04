import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlistPostComponent } from './plist.component';

describe('PlistComponent', () => {
  let component: PlistPostComponent;
  let fixture: ComponentFixture<PlistPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlistPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlistPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
