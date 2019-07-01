import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent implements OnInit {
  public listaCurso: string[] = ['asf', 'sdg', 'gegw'];
  public enable = true;
  constructor() { }

  ngOnInit() {
  }

  setEnableStatus(): void {
    this.enable = this.enable ? false : true;
  }
}
