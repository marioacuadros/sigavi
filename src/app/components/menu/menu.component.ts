import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service'
import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private menuService: MenuService,
              private router:Router,
              private loginService: LoginService
  ) 
  {
  }
  padres:any = null;
  hijos:any = null;
  items:any = null;
  usuario:any = null;
  logueado:boolean=false;

  ngOnInit(): void {
    this.getLogueado()
    this.listItems()
  }
  
  listItems(){
    let id = 0
    if (this.usuario!=null)
      id = this.usuario.id_rol
      this.menuService.listItem(id).subscribe(
      result => {
          this.padres = result;
          this.hijos = result;
      }
    );
  }

  exit(){
    this.logueado = false;
    this.padres = null
    this.hijos = null
    this.usuario = null
    this.listItems()
    localStorage.removeItem("token");
    localStorage.removeItem("key");
    this.router.navigate(['/login']);
  }
  getLogueado(){
    let user = this.loginService.getUsuarioLogueado();
    if(user!=null)
    {
      this.usuario = user
      this.logueado = true
    }
  }
}
