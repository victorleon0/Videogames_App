import { IfStmt } from '@angular/compiler';
import { FormGroup } from '@angular/forms';

export function validateYear(controlYear:string){
    return(formGroup: FormGroup) =>{
        const year = formGroup.controls[controlYear]; 
        let numberYear = Number(year.value);

        if(year.errors && !year.errors['incorrect']){
            return;
        }

        if(numberYear >= 1960 && numberYear <= 2030){
            year.setErrors(null);
        }else{
            year.setErrors({'incorrect': true});
        }
        
        
    }
}

export function checkedRequired(controlPlatform:any){
    return(formGroup: FormGroup) => {
        const platform = formGroup.controls[controlPlatform];
        let checked:boolean = false;
        
        if(platform.errors && !platform.errors['notChecked']){
            return;
        }

        for(let item of platform.value){
            if(item){
                checked = true;
            }
        }
        
        if(checked){
            platform.setErrors(null);
        }else{
            platform.setErrors({'notChecked': true});
        }
    }
}