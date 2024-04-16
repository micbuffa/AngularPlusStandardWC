import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-wamhost-wc',
  standalone: true,
  imports: [],
  templateUrl: './wamhost-wc.component.html',
  styleUrl: './wamhost-wc.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class WamhostWCComponent {
  path = "https://www.webaudiomodules.com/community/plugins/burns-audio/synth101/index.js";
}
