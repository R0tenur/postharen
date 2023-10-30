import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';

// Load any languages you need
hljs.registerLanguage('json', json);

hljs.registerLanguage('xml', xml);

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class ResponseComponent implements OnInit {
  @Input()
  response: any = {
    status: 200,
    statusText: 'OK',
    headers: [
      {
        key: 'Content-Type',
        value: 'application/json',
      },
    ],
    body: {
      type: 'json',
      value: {
        name: 'John Doe',
        email: 'example@example.com',
      },
    },
  };
  highlightedBody: any = '';

  ngOnInit(): void {
    this.highlightedBody = hljs.highlight(
      JSON.stringify(this.response.body.value, null, '\t'),
      {
        language: this.response.body.type,
      }
    ).value;
  }
}
