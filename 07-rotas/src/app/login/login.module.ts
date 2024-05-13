import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { LoginComponent } from "./login.component";
import { AuthService } from "./auth.service";




@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        
    ],
    exports: [],
    declarations: [
        LoginComponent,
        
    ],
    providers: [AuthService],
})

export class LoginModule { }