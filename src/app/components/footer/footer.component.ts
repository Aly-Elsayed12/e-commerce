import { Component } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private _flowbiteService:FlowbiteService){}

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite(flowbite => {
    });
  }
}
