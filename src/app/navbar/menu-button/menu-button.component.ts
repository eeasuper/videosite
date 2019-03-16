import { ElementRef,Input,ViewChild,Component,OnChanges,SimpleChanges, Renderer2} from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css']
})
export class MenuButtonComponent implements OnChanges {

  @Input() xCord: number;
  @Input() yCord: number;
  @Input() clicked: boolean;
  @ViewChild('btnRipples') private btnRipples:ElementRef;

  constructor(private renderer: Renderer2){}

  ngOnChanges(changes:SimpleChanges){
    if(changes.clicked.firstChange){
      //On initialization of /docs, the code below gets called without this. So prevent first change.
      return null;
    }
    if(changes.clicked.previousValue){
      //in navbar.component.ts, the input is changed in a timeout and will unnecessarily call ngOnChanges, so prevent it.
      return null;
    }
    let newEl = this.renderer.createElement('div');
    this.renderer.appendChild(this.btnRipples.nativeElement, newEl);
    this.renderer.addClass(newEl, 'ripple');
    this.renderer.setStyle(newEl,'visibility', 'visible');
    //the number 15 is minused because of the padding added to .menu_button(the parent).
    this.renderer.setStyle(newEl, 'left', this.xCord - 15+'px');
    this.renderer.setStyle(newEl, 'top', this.yCord - 15+'px');
    setTimeout(()=>{
      this.renderer.addClass(newEl,'doRipple');
    },0)
    setTimeout(()=>{
      this.renderer.removeChild(this.btnRipples.nativeElement, newEl);
    },500)
  }
}
