import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, OnChanges, OnInit } from '@angular/core';
import { ContractsService } from './contracts.service';
import { takeWhile, tap } from "rxjs/operators";
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

@Injectable()
export class AppComponent implements OnInit{
  title = 'my-app';
  public contracts$ : any;
  public object:any;

  constructor(public contractsService: ContractsService,
              private changeDetector: ChangeDetectorRef){
    
  }

  ngOnInit(){
    this.contracts$ = this.contractsService.getAllContracts().pipe(
      tap((val) => {
        console.log('oi', val)
      }),
      takeWhile(val => !val.processado, true)
    )
    this.oi()

    setInterval(() => {
      console.log('render')
      this.title = 'BIRIBAU'
      this.contracts$.saldoTotal = 1000;
      this.changeDetector.markForCheck();

    }, 6000);
    
      
  }

  oi(){
    this.title = 'BALUCUBACO'
  }
}
