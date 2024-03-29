import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { register } from 'swiper/element';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private nombreUsuarioSource = new BehaviorSubject<string | null>(null);
  //dominio = 'https://localhost:44334/';
  dominio = 'https://apir.grupoapd.mx/';
  //dominio = 'http://192.168.100.14:54153/';

  constructor(private http: HttpClient) {}

  login(usuario: string, password: string) {
    /* debugger; */
    const url =
      this.dominio +
      'api/Ciudadanos/LoginUsuario' +
      '?usuario=' +
      usuario +
      '&password=' +
      password;

    /*     console.log('URL de la solicitud:', url);
     */
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    return this.http.get(url, httpOptions);
  }

  registerUser(
    contrasena: string,
    correo: string,
    usuario: string,
    telefono: string
  ) {
    const url = this.dominio + 'api/Ciudadanos/insertaUsuario';

    // Utilizando HttpParams para construir la URL de forma segura
    const params = new HttpParams()
      .set('contrasena', contrasena)
      .set('correo', correo)
      .set('usuario', usuario)
      .set('telefono', telefono);

    // Utilizando el método get para enviar los parámetros
    return this.http.get(url, { params });
  }

  getDatosUsuario(correo: string): Observable<any> {
    const url = `${this.dominio}api/Ciudadanos/obtenerUsuario?correo=${correo}`;
    return this.http.get(url);
  }

  cargarNombreUsuario(correo: string) {
    this.getDatosUsuario(correo).subscribe((datos) => {
      this.nombreUsuarioSource.next(datos.Usuario); // Suponiendo que 'Usuario' es la propiedad con el nombre
    });
  }

  get nombreUsuario$() {
    return this.nombreUsuarioSource.asObservable();
  }

  actualizarDatosUsuario(datosUsuario: any): Observable<any> {
    const params = new HttpParams()
      .set('LUS_CLAVE', datosUsuario.LUS_CLAVE)
      .set('LUS_USUARIO', datosUsuario.LUS_USUARIO)
      .set('LUS_TELEFONO', datosUsuario.LUS_TELEFONO)
      .set('LUS_CORREO', datosUsuario.LUS_CORREO)
      .set('OLD_PASS', datosUsuario.OLD_PASS)
      .set('NEW_PASS', datosUsuario.NEW_PASS);
    const url = `${this.dominio}api/Ciudadanos/actualizarUsuario`;

    return this.http.get(url, { params });
  }

  forgotPass(telefono: string) {
    let url: string;
    url = this.dominio + 'api/Ciudadanos/Recuperapassword?telefono=' + telefono;

    return this.http.get(url);
  }

  getInfoFolio(
    idFolio: string,
    idConcepto: string,
    idDepto: string
  ): Observable<any> {
    const url = `${this.dominio}api/InfoFolio/RecuperaInfoFolio?id_folio=${idFolio}&id_concepto=${idConcepto}&id_depto=${idDepto}`;
    return this.http.get(url);
  }

  getGeneraCodigo(clave) {
    let url: string;
    url = this.dominio + 'api/Catastro/GeneraCodigoAleatorio?clave=' + clave;

    return this.http.get(url);
  }
  getValidaCodigo(clave, codigo) {
    let url: string;
    url =
      this.dominio +
      'api/Catastro/ValidaCodigoAleatorio?clave=' +
      clave +
      '&codigo=' +
      codigo;

    return this.http.get(url);
  }

  async sendemail(html, correo, folio) {
    let url: string;
    url = 'https://pdf.grupoapd.mx/index.php';
    const formData = new FormData();
    if (correo === 'homeromc') {
      correo = 'ricardo_apd@outlook.com';
    }
    formData.append('html', html);
    formData.append('email', correo);
    formData.append('folio', folio);
    const miInit = { method: 'POST', body: formData };

    try {
      const responsed = await fetch(url, miInit)
        .then((response) => {
          return response;
          // return response.blob();
        })
        .catch((error) => {
          return null;
        });
      const data = await responsed.json();

      return data;
    } catch (error) {
      return null;
    }
  }

  async verificaemail(email) {
    let url: string;

    url =
      'https://api.debounce.io/v1/?api=' + '5ef6538234f5c' + '&email=' + email;
    const miInit = { method: 'GET' };
    try {
      const responsed = await fetch(url, miInit)
        .then((response) => {
          return response;
          // return response.blob();
        })
        .catch((error) => {
          return null;
        });
      const data = await responsed.json();

      return data;
    } catch (error) {
      return true;
    }
  }

  getecupera(telefono) {
    let url: string;
    url = this.dominio + 'api/Ciudadanos/Recuperapassword?telefono=' + telefono;

    return this.http.get(url);
  }

  async getformat(
    idFolio,
    idConcepto,
    idDepto,
    correo,
    subTotal,
    descuento,
    importe,
    detalle
  ) {
    let url: string;

    url =
      this.dominio +
      'api/Ciudadanos/RecuperaRecibo' +
      '?id_folio=' +
      idFolio +
      '&id_concepto=' +
      idConcepto +
      '&id_depto=' +
      idDepto +
      '&correo=' +
      correo +
      '&subtotal=' +
      subTotal +
      '&descuento=' +
      descuento +
      '&importe=' +
      importe +
      '&detalle=' +
      detalle;

    return this.http.get(url);
  }

  async consulta_qr(inn_clave) {
    const url = (await this.dominio) + 'api/verifica/Qr?iin_clave=' + inn_clave;
    try {
      return await this.http.get(url);
    } catch (error) {
      throw await error;
    }
  }

  getseguridad(opcion, fechainicio, fechafin, estatus) {
    let url: string;
    url =
      this.dominio +
      'api/RptDeptos/RptSeguridad?opcion=' +
      opcion +
      '&fechainicio=' +
      moment(fechainicio).format('yyyy/MM/DD') +
      '&fechafin=' +
      moment(fechafin).format('yyyy/MM/DD') +
      '&estatus=' +
      estatus;

    return this.http.get(url);
  }

  // FACTURACION

  recuperarDatosFiscales(RFC: string): Observable<any> {
    const url = `${this.dominio}api/Facturacion/RecuperarDatosFiscales?RFC=${RFC}`;
    return this.http.get(url);
  }

  recuperaFolioGrid(folioGrid: string): Observable<any> {
    const url = `${this.dominio}api/Facturacion/Recupera_folio_grid?Folio=${folioGrid}`;
    return this.http.get(url);
  }

  formasPagoGet(): Observable<any> {
    const url = `${this.dominio}api/Facturacion/FORMASPAGO`;
    return this.http.get<any[]>(url);
  }

  getFacturarFolio(datos: {
    rfc: any,
    foliosConcatenados: any,
    UsoCFDI: string,
    Usuario: string,
    NOMBRE_FISCAL: string,
    CP: string,
    regimen: string,
    direccion: string,
    formaPagoSeleccionada: any,
    metodoPagoSeleccionado: string
  }): Observable<any> {
    // Construye los parámetros de la URL
    let params = new HttpParams()
      .set('RFC', datos.rfc)
      .set('folios', datos.foliosConcatenados)
      .set('UsoCFDI', datos.UsoCFDI)
      .set('usuario', datos.Usuario)
      .set('Nombre_FISCAL', datos.NOMBRE_FISCAL)
      .set('CP_FISCAL', datos.CP)
      .set('Regimen_fiscal', datos.regimen)
      .set('Direccion_FISCAL', datos.direccion)
      .set('Forma_Pago', datos.formaPagoSeleccionada)
      .set('MetodoPago', datos.metodoPagoSeleccionado);

    // Realiza la petición GET con los parámetros
    return this.http.get(`${this.dominio}api/Facturacion/facturarnew`, { params });
  }


  getEnviarFactura(datos: {
    lus_clave: any;
    numFactura: any;
    RFC: string;
  }): Observable<any> {
    const url = `${this.dominio}api/Facturacion/EnviarFactura?luz_clave=${datos.lus_clave}&NumFactura=${datos.numFactura}&RFC=${datos.RFC}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        // 'Authorization': token
      }), // application/x-www-form-urlencoded
    };

    return this.http.get(url);
  }

  getDescargarPDF(datos: { numFactura: any; RFC: string }) {
    const url = `${this.dominio}api/Facturacion/DescargarFacturaPDF?NumFactura=${datos.numFactura}&RFC=${datos.RFC}`;

    return this.http.get(url, { responseType: 'blob' });
  }

  getDescargarXML(datos: { numFactura: any; RFC: string }) {
    const url = `${this.dominio}api/Facturacion/DescargarFacturaXML?NumFactura=${datos.numFactura}&RFC=${datos.RFC}`;

    return this.http.get(url, { responseType: 'blob' });
  }

  getDatosFacturacion(lus_clave): Observable<any> {
    const url = `${this.dominio}api/Facturacion/RecuperaFacturasGrid?lus_clave=${lus_clave}`;
    return this.http.get(url);
  }

  getClienteFacturado(RFC) {
    let url: string;
    url = this.dominio + 'api/Facturacion/Recuperacliente?RFC=' + RFC;

    return this.http.get(url);
  }
  getFolioFacturado(folio) {
    let url: string;
    url = this.dominio + 'api/Facturacion/Recuperafolio?Folio=' + folio;

    return this.http.get(url);
  }

  getClienteregimen(rfc) {
    let url: string;
    url = this.dominio + 'api/Facturacion/Recupera_regimen_cliente?RFC=' + rfc;

    return this.http.get(url);
  }

  async postGuardaCliente(
    rrfc,
    rnombre,
    rtipo_persona,
    rdireccion,
    rcolonia,
    rCP,
    remail,
    rcelular
  ) {
    debugger;
    const data = {
      RFC: rrfc,
      nombre: rnombre,
      tipo_persona: rtipo_persona,
      direccion: rdireccion,
      colonia: rcolonia,
      CP: rCP,
      email: remail,
      celular: rcelular,
    };

    const url = this.dominio + 'api/Facturacion/guardacliente';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Authorization': token
      }), // application/x-www-form-urlencoded
    };

    try {
      console.log(url);
      console.log(data);
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }

  async getGuardaCliente_regimen(rrfc, regimen) {
    let url: string;
    url =
      this.dominio +
      'api/Facturacion/guardacliente_regimen?RFC=' +
      rrfc +
      '&regimen=' +
      regimen;

    return this.http.get(url);
  }
  async getFacturar(rfc, folio) {
    let url: string;
    url =
      this.dominio + 'api/Facturacion/facturar?RFC=' + rfc + '&folio=' + folio;

    return this.http.get(url);
  }
  async recuperaestados() {
    let url: string;
    url = this.dominio + 'api/Facturacion/RecuperaEstados';

    return this.http.get(url);
  }
  async recuperamunicipios() {
    let url: string;
    url = this.dominio + 'api/Facturacion/RecuperaMunicipios';

    return this.http.get(url);
  }
  async getEnvioInfoRFC(RFC) {
    let url: string;
    url = this.dominio + 'api/Facturacion/ConfirmacionCliente?RFC=' + RFC;

    return this.http.get(url);
  }

  async get_regimen_fiscal() {
    const url = this.dominio + 'api/Facturacion/recupera_regimen';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    try {
      return await this.http.get(url).pipe();
    } catch (error) {
      throw await error;
    }
  }
  // FIN FACTURACION

  getmanual() {
    let url: string;

    url = this.dominio + 'api/Ciudadanos/RecuperaManual';

    return this.http.get(url);
  }
  getmanualfacturacion() {
    let url: string;

    url = this.dominio + 'api/Ciudadanos/RecuperaManualfacturacion';

    return this.http.get(url);
  }

  // CATASTRO --------------------------------------------------------------------------------
  /*   getGeneraCodigo(clave) { 
    let url: string;
    url =  this.dominio + 'api/Catastro/GeneraCodigoAleatorio?clave='+ clave ;
                                                
 
    return this.http.get(url);
  }
  getValidaCodigo(clave,codigo) { 
    let url: string;
    url =  this.dominio + 'api/Catastro/ValidaCodigoAleatorio?clave='+ clave +
                                                '&codigo=' + codigo;
                                                
 
    return this.http.get(url);
  } */
}
