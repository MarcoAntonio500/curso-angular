import { Component, Inject, ViewChild } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { EMPTY, Observable, Subject, catchError, empty, pipe, switchMap, take } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  providers: [{ provide: 'cursoSelecionado', useValue: { id: 1, nome: 'Curso Selecionado' } }],
  preserveWhitespaces: true
})
export class CursosListaComponent {

  deleteModalRef: BsModalRef = new BsModalRef;
  @ViewChild('deleteModal', { static: true }) deleteModal: any;

  //cursos: Curso[] = []

  cursos$: Observable<Curso[]> = new Observable
  error$ = new Subject<boolean>()
  bsModalRef: BsModalRef = new BsModalRef

  

  constructor(
    private service: CursosService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router, 
    private route: ActivatedRoute,
    @Inject('cursoSelecionado') private cursoSelecionado: Curso
  ){ }

  ngOnInit() {
    //this.service.list()
    //.subscribe(dados => this.cursos = dados)
    
    this.onRefresh()
  }
  onRefresh() {
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        //this.error$.next(true)
        this.handleError();
        return empty();
      })
    )
    //this.service.list()
    //.pipe(
    //  catchError(error => empty())
    //)
    //.subscribe(
    //  dados => {
    //    console.log(dados)
    //  },
    // error => console.error(error),
    // () => console.log('observable completo!')
    //)
  
  }

  handleError() {
    this.bsModalRef = this.modalService.show(AlertModalComponent)
    this.bsModalRef.content.type ='danger'
    this.bsModalRef.content.message ='Erro ao carregar. Tente novamente'


  }
  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route })

  }

  onDelete(curso: any) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

    const result$ = this.alertService.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse curso?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
      }
    );
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}

