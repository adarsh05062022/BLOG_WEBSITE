import { Component } from '@angular/core';

declare var tinymce: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  content: any;
  ngOnInit() {}

  getContent() {
    const parser = new DOMParser();

    const editor = tinymce.get('my-editor');
    if (editor) {
      const content = editor.getContent();

      const html = parser.parseFromString(content, 'text/html');
      const body = html.body;
      this.content = body.innerHTML;

      return this.content;
    }
  }
}
