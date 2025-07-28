import { Component, OnInit } from '@angular/core';
import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria';
import { LugarService } from '../../lugares/lugar.service';
import { CategoriaService } from '../../categorias/categoria.service';


@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit {

  lugar: Lugar[] = [];
  categoriasFiltro: Categoria[] = [];
  nomeFiltro: string = '';
  categoriaFiltro: string = '';

  constructor(
    private lugarService: LugarService,
    private categoriaService: CategoriaService
  ){

  }

  ngOnInit(): void {

    this.categoriaService.obterTodas()
    .subscribe(categorias => this.categoriasFiltro = categorias);

    this.lugarService.obterTodos()
    .subscribe(lugaresResposta => this.lugar = lugaresResposta);

}

  getTotalEstrelas(lug: Lugar) : string {
    return '&#9733;'.repeat(lug.avaliacao || 0) + '&#9734;'.repeat( 5 - (lug.avaliacao || 0) )
  }


  filtrar() {
    this.lugarService.filtrar(this.nomeFiltro, this.categoriaFiltro)
  }

}
