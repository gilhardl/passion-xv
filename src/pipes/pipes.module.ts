import { NgModule } from '@angular/core';
import { EnumToStringPipe } from './enum-to-string/enum-to-string';

@NgModule({
	declarations: [ EnumToStringPipe ],
	imports: [],
	exports: [ EnumToStringPipe ]
})
export class PipesModule { 
	static forRoot() {
		return {
				ngModule: PipesModule,
				providers: [],
		};
 	}
}
