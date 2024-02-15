import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service'

@Component({
  selector: 'app-cambiar-pwd',
  templateUrl: './cambiar-pwd.component.html',
  styleUrls: ['./cambiar-pwd.component.css']
})
export class CambiarPwdComponent {
  changeForm: FormGroup;
  constructor(
    private frmBuilder: FormBuilder,
    private usuarioService: UsuarioService,
  ){
    this.changeForm = this.frmBuilder.group({
      pwd:['', Validators.pattern("^[a-zA-Z0-9]{8,15}$")],
      comfirm:['', Validators.required]      
    })
  }
  pwd:string = ''
  comfirm:string = ''
  key:string=''

  user:any = {
    pwd: '',
    key:''
  }

  ngOnInit(): void {
    this.getKeyUser()
  }

  getKeyUser(){
    let key = localStorage.getItem('key');
    if (key!==null)
      this.key = key
  }

  change(){
    if(this.pwd !== this.comfirm && this.pwd !== '' && this.comfirm !== '' ){
      alert ("La contraseña y el campo de confirmación no coinciden")
    }else{
      this.user.key = this.key
      this.user.pwd = this.pwd
      this.usuarioService.updatePwd(this.user).subscribe(
        data => {
          alert("La contraseña fue cambiada")
        }
      );
    }
  }
}
