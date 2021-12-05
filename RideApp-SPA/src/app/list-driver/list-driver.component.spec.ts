/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListDriverComponent } from './list-driver.component';

describe('ListDriverComponent', () => {
  let component: ListDriverComponent;
  let fixture: ComponentFixture<ListDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
