import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ColorPickerComponent } from './color-picker/color-picker';

@NgModule({
	declarations: [ColorPickerComponent],
	imports: [IonicPageModule],
	exports: [ColorPickerComponent],
	entryComponents: [ColorPickerComponent]
})
export class ComponentsModule {
	static forRoot() {
		return {
				ngModule: ComponentsModule,
				providers: [],
		};
	}
}
