import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSignalDemoComponent } from './link-signal-demo.component';

describe('LinkSignalDemoComponent', () => {
  let component: LinkSignalDemoComponent;
  let fixture: ComponentFixture<LinkSignalDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkSignalDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkSignalDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
