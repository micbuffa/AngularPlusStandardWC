import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WamhostWCComponent } from './wamhost-wc/wamhost-wc.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WamhostWCComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'wam-app';
  path = 'https://www.webaudiomodules.com/community/plugins/burns-audio/synth101/index.js';
  ui = undefined;
  audioContext = new AudioContext();

  ngOnInit() {
    this.init();
    console.log("init")
  }

  init() {

    let hostKey;
    let plugins;

    const initHost = async (audioContext:any) => {
      const scriptUrl = 'https://mainline.i3s.unice.fr/wam2/packages/sdk/src/initializeWamHost.js';
      const {default: initializeWamHost} = (await import(/* @vite-ignore */ scriptUrl)) as any;

      const [, key] = await initializeWamHost(audioContext, "example");
      hostKey = key;
    };

   
    
    let wam;
    
    let run = async (wamUrl) => {
      
      await initHost(this.audioContext);
    
      wam = await this.loadWAM(wamUrl)
      
      // create the UI and add it to the container
      this.ui = await wam.createGui()

      // inseret the GUI
      document.querySelector("#wam").appendChild(this.ui)

        
      wam.audioNode.connect(this.audioContext.destination); 
    }

    run(this.path);
  }

  loadWAM = async(path) => {
    console.log("load wam")
    const initialState = {};
    const {default: WAM} = await import(/* @vite-ignore */ path);
    
    if (typeof WAM !== 'function' || !WAM.isWebAudioModuleConstructor) {
      throw new Error(`Path ${path} is not a WebAudioModule.`)
    };
    
    const instance = new WAM("example", this.audioContext)
    await instance.initialize(initialState)
    
    return instance;
  }

}
