import { AfterViewInit, Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResponseComponent } from './components/response/response.component';
import { ipcRenderer, webFrame } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ResponseComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  ipcRenderer!: typeof ipcRenderer;
  webFrame!: typeof webFrame;
  childProcess!: typeof childProcess;
  fs!: typeof fs;
  headers = [
    {
      key: 'Content-Type',
      value: 'application/json',
    },
  ];

  queryParameters = [
    {
      key: '',
      value: '',
    },
  ];

  body = '';
  url = 'https://dummyjson.com/products/1';
  method = 'GET';
  title = 'postharen';
  response: any;

  constructor(private readonly zone: NgZone) {
    this.ipcRenderer = (window as any).require('electron').ipcRenderer;
    this.webFrame = (window as any).require('electron').webFrame;

    this.fs = (window as any).require('fs');

    this.childProcess = (window as any).require('child_process');
    this.childProcess.exec('node -v', (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout:\n${stdout}`);
    });
  }

  ngAfterViewInit(): void {
    const setResponse = this.setResponse.bind(this);
    this.zone.runOutsideAngular(() => {
      this.ipcRenderer.on('sending-request', (event: any, response: any) => {
        this.zone.run(() => {
          setResponse({
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            body: { value: response.body, type: 'json' },
          });
        });
      });
    });
  }

  addHeader() {
    this.headers.push({ key: '', value: '' });
  }
  removeHeader(index: number) {
    this.headers.splice(index, 1);
  }

  async sendRequest() {
    this.response = null;
    const request = {
      url: this.url,
      method: this.method,
      headers: this.headers,
      queryParameters: this.queryParameters,
      body: this.body,
    };

    this.zone.runOutsideAngular(() => {
      this.ipcRenderer.send('sending-request', request);
    });
  }

  setResponse(response: any) {
    this.response = response;
  }
}
