import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CategoriaService } from '../categoria.service';
import { Subscriber } from 'rxjs';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  camposForms: FormGroup;

  constructor(private service: CategoriaService) {
    this.camposForms = new FormGroup({
        nome: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required),
    })
  }

  salvar(){
    this.camposForms.markAllAsTouched();
    if(this.camposForms.valid){
      this.service
      .salvar(this.camposForms.value)
      .subscribe({
         next: categoria =>{
           console.log('Salva com Sucesso!', categoria);
          this.camposForms.reset();
         },
         error: erro => console.error('Ocorreu um erro: ', erro)
      })
    }
    console.log('Valores Digitados:', this.camposForms.value);
    
  };

  isCampoInvalido(nomeCampo: string) : boolean {
    const campo = this.camposForms.get(nomeCampo);
    return campo?.invalid && campo?.touched && campo?.errors?.['required'];
  };
}
