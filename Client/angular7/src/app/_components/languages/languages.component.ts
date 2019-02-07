import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../_services';

@Component({
  selector: 'languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.less']
})
export class LanguagesComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  setLang(lang: string) {
    this.translate.use(lang);
  }

}
