import { Injectable } from '@angular/core';
import {Subject, Observable,Subscription} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DraggableCellService {
  public elementOffsets = [];
  // public selectedElOffset;
  private data2;
  private data1:Subscription;
  public data:Subject<object> = new Subject<object>();

  public elementOffsetsSubject:Subject<any> = new Subject<any>();
  public selectedEl:Subject<number> = new Subject<number>();
  public selectedElOffset:Subject<number> = new Subject<number>();
  public selectedOriginalOff:number;
  public selectedElIndex:number;
  public movingSubscription: Subscription;

  private debounce = 0;
  constructor() {
    this.movingSubscription = this.selectedElOffset.asObservable().subscribe((y)=>{
      if(this.debounce === 0){
        this.debounce = window.setTimeout(()=>{
          this.checkOrder(y);
          this.debounce = 0;
        },300);
      }
      
    })
    this.data1 = this.data.asObservable().subscribe((data)=>{
      this.data2 = data;
    })
  }

  checkOrder(y:number){
    console.log(this.selectedOriginalOff)
    let next = this.elementOffsets.map((val,ind)=>{
      let a = this.selectedOriginalOff + y;
      if(val.y > a && this.selectedOriginalOff> val.y){
        //order should go up by 1.
        this.adjustData(true,ind);
        // console.log(val.name);
        console.log(val.raised);
      }else{
        // val.raised = false;
      }
      if(val.y < a && this.selectedOriginalOff < val.y){
        this.adjustData(false,ind);
        val.lowered = true;
        // console.log(val.name);
        console.log(val.lowered);
      }else{
        // val.lowered = false;
      }
      //val = 188, selectedElOffset = 240, e.y = -100
    })
  }

  adjustData(raiseOrder:boolean, index:number){
    if(raiseOrder){
      this.data2.list[index].order += 1;
      this.data2.list[this.selectedElIndex].order -= 1;
    }else{
      this.data2.list[index].order -= 1;
      this.data2.list[this.selectedElIndex].order += 1;
    }
    console.log(this.data2);
    this.data.next(this.data2);  
  }
}
