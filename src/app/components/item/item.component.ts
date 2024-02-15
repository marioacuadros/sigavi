import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Item } from 'src/app/models/item';
import { MenuService } from 'src/app/services/menu.service'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  filterForm: FormGroup;
  addForm: FormGroup;
  constructor(private frmBuilder: FormBuilder,
              private menuService: MenuService,
    ) 
  {
    this.filterForm = this.frmBuilder.group({
      palabraBuscar:[]
    })
    this.addForm = this.frmBuilder.group({
      item: ['', Validators.required],
      componente:['', Validators.required],
      padre:['', Validators.required],
      bloque:['', Validators.required],
      orden:['', Validators.required]
    });
  }

  item:Item={
    id:0,
    item: '',
    componente: '',
    padre: 0,
    bloque:0,
    orden:0,
    activo:1,
  }
  
  modoEdicion : boolean = false
  items: any = null
  itemsPadre: any = null
  key:string=''
  itemReset:Item = this.item

  ngOnInit(): void {
    this.listItem()
    this.listPadres()
  }

  listItem(){
    this.menuService.listAllItem().subscribe(
      result => {
          this.items = result;
      }
    );
  }

  listPadres(){
    this.menuService.listPadres().subscribe(
      result => {
          this.itemsPadre = result;
      }
    );
  }

  searchItem(){
    this.menuService.search(this.key).subscribe(
      result => {
          this.items = result;
          this.key = '';
      }
    );
  }

  changeState(item:Item){
    this.menuService.changeState(item).subscribe(
      data => {
        this.listItem();
      }
    );
  }
  
  delItem(item:Item){
    if(confirm('Realmente desea elimnar el registro?')){
      this.menuService.delItem(item).subscribe(
        data => {
          this.listItem();
        }
      );
    }  
  }
  getItem(item:Item){
    this.modoEdicion = true;
    this.item = item;
    console.log(this.item)
    this.listItem()
  }
  addItem(){
    this.menuService.addItem(this.item).subscribe(
      data => {
        this.resetItem();
        this.listItem();
        this.item = this.itemReset
      }
    );
  }
  updateItem(){
    this.menuService.updateItem(this.item).subscribe(
      data => {
        this.resetItem();
        this.listItem();
        //this.modoEdicion = false
        //this.item = this.itemReset
      }
    );
  }
  resetItem(){
    this.item = this.itemReset
  }
}
