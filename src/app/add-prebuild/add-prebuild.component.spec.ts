import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrebuildComponent } from './add-prebuild.component';

describe('AddPrebuildComponent', () => {
  let component: AddPrebuildComponent;
  let fixture: ComponentFixture<AddPrebuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPrebuildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrebuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
