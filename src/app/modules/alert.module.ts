import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from '../components/alerts/alerts.component';


@NgModule({
    imports: [CommonModule],
    declarations: [AlertsComponent],
    exports: [AlertsComponent]
})
export class AlertModule { }
