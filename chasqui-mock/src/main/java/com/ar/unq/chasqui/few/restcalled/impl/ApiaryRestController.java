package com.ar.unq.chasqui.few.restcalled.impl;

import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ar.unq.chasqui.few.core.dto.CategoriaDto;
import com.ar.unq.chasqui.few.core.dto.DireccionDto;
import com.ar.unq.chasqui.few.core.dto.MedallasDto;
import com.ar.unq.chasqui.few.core.dto.ProductorDto;
import com.ar.unq.chasqui.few.core.dto.UsuarioFullDto;
import com.ar.unq.chasqui.few.core.dto.apiary.FiltoProductoDto;
import com.ar.unq.chasqui.few.core.dto.apiary.NuevoUsuarioDto;
import com.ar.unq.chasqui.few.core.dto.apiary.PaginaProductoDto;
import com.ar.unq.chasqui.few.core.service.example.ProductoServiceMock;
import com.ar.unq.chasqui.few.core.service.example.VariosServiceMock;
@CrossOrigin
@RestController
public class ApiaryRestController {

	VariosServiceMock serv = new VariosServiceMock();
	ProductoServiceMock servProd = new ProductoServiceMock();
	/*
	 *
	 * client/sso/singIn
	 */

	/** Log In - http://docs.chasqui.apiary.io/#reference/0/servicios-publicos/log-in?console=1 */
	@RequestMapping(value = "/client/sso/singIn", method = RequestMethod.POST)
	public @ResponseBody void login(@RequestBody UsuarioFullDto user,HttpServletRequest request,HttpServletResponse response) {
		System.out.println("Log In " + user);
		printHeader(request);
		//Access-Control-Expose-Headers: X-Total-Pages, X-Page
		response.setHeader("Access-Control-Expose-Headers", "Authorization");
		response.setHeader("Authorization", "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==");
		// TODO MANEJAR ERRORs
	//	return new NuevoUsuarioDto(user.getEmail(),"123456Token");
	}

	@RequestMapping(value = "/client/resetPass/{email}", method = RequestMethod.POST)
	public @ResponseBody void login(@PathVariable("email") String email) {
		System.out.println("Reset PASS " + email);

		// TODO MANEJAR ERRORs
		//new ResponseEntity<>(headers, statusCode)
	}

	/**
	 * http://168.181.184.203:8080/chasqui/chasqui/rest/client/sso/singUp
	 *
	 * @return
	 */
	@RequestMapping(value = "/client/sso/singUp", method = RequestMethod.POST)
	public @ResponseBody NuevoUsuarioDto singUp(@RequestBody UsuarioFullDto user) {
		System.out.println("singUp " + user);

		return new NuevoUsuarioDto(user.getEmail(), "token123456");
	}

	/**
	 * /chasqui/rest/client/categoria/all/idVendedor
	 */
	@RequestMapping(value = "/client/categoria/all/{idVendedor}", method = RequestMethod.GET)
	public @ResponseBody List<CategoriaDto> findCategorias(@PathVariable("idVendedor") String idVendedor,HttpServletRequest request) {
		System.out.println("categoria " + idVendedor);
		printHeader(request);
		return serv.findCategorias();
	}

	/**
	 * /chasqui/rest/client/productor/all/idVendedor
	 */
	@RequestMapping(value = "/client/productor/all/{idVendedor}", method = RequestMethod.GET)
	public @ResponseBody List<ProductorDto> findProductores(@PathVariable("idVendedor") String idVendedor,HttpServletRequest request) {
		System.out.println("findProductores " + idVendedor);
		printHeader(request);
		return serv.findProductores();
	}

	/** /chasqui/rest/client/medalla/all
	 * */
	@RequestMapping(value = "/client/medalla/all", method = RequestMethod.GET)
	public @ResponseBody List<MedallasDto> findMedallas() {
		System.out.println("findMedallas ");

		return serv.findMedallas();
	}

	/** /client/producto/byCategoria*/
	@RequestMapping(value = "/client/producto/byCategoria", method = RequestMethod.POST)
	public @ResponseBody PaginaProductoDto findProductosByCategoria(@RequestBody FiltoProductoDto filter) {
		System.out.println("findProductosByCategoria " + filter);

		return servProd.findProductos(filter.getPagina(), filter.getCantItems());
	}


	/** /client/producto/byProductor*/
	@RequestMapping(value = "/client/producto/byProductor", method = RequestMethod.POST)
	public @ResponseBody PaginaProductoDto findProductosByProductor(@RequestBody FiltoProductoDto filter) {
		System.out.println("findProductosByProductor " + filter);

		return servProd.findProductos(filter.getPagina(), filter.getCantItems());
	}


	/** /client/producto/byMedalla*/
	@RequestMapping(value = "/client/producto/byMedalla", method = RequestMethod.POST)
	public @ResponseBody PaginaProductoDto findProductosByMedalla(@RequestBody FiltoProductoDto filter) {
		System.out.println("findProductosByMedalla " + filter);

		return servProd.findProductos(filter.getPagina(), filter.getCantItems());
	}

	/** /client/producto/byQuery*/
	@RequestMapping(value = "/client/producto/byQuery", method = RequestMethod.POST)
	public @ResponseBody PaginaProductoDto findProductosByQuery(@RequestBody FiltoProductoDto filter) {
		System.out.println("findProductosByQuery " + filter);

		return servProd.findProductos(filter.getPagina(), filter.getCantItems());
	}

	//////////////////////// USUARIO

	/**
	http://168.181.184.203:8080/chasqui/rest/user/adm/read
	Ver perfil de usuario
	*/
	@RequestMapping(value = "/user/adm/read", method = RequestMethod.GET)
	public @ResponseBody UsuarioFullDto readUser(HttpServletRequest request) {
		System.out.println("readUser " + tieneToken(request));

		return serv.findUser();
	}

	/*** /user/adm/edit
	 *  Modificar usuario */
	@RequestMapping(value = "/user/adm/edit", method = RequestMethod.PUT)
	public @ResponseBody void editUser(@RequestBody UsuarioFullDto user,HttpServletRequest request) {
		printHeader(request);
		System.out.println("editUser " + user);

	}

	/*** user/adm/dir
	 * Ver direcciones*/
	@RequestMapping(value = "/user/adm/dir", method = RequestMethod.GET)
	public @ResponseBody List<DireccionDto> verDirecciones(HttpServletRequest request) {
		System.out.println("verDirecciones " + tieneToken(request));

		List<DireccionDto> findDomicilios = serv.findDomicilios(1);
		findDomicilios.get(0).setPredeterminada(true);

		return findDomicilios;
	}

	/*** user/adm/dir
	 * NUEVA DIRECCION*/
	@RequestMapping(value = "/user/adm/dir", method = RequestMethod.POST)
	public @ResponseBody void nuevaDireccion(@RequestBody DireccionDto direccion,HttpServletRequest request) {
		printHeader(request);
		System.out.println("nuevaDireccion " + direccion);

	}



	/////////////////// privados

	private Boolean tieneToken(HttpServletRequest request){
		Enumeration<String> headerNames = request.getHeaderNames();
		Boolean tiene= false;
		System.out.println("***** HEADERS");
		while(headerNames.hasMoreElements()){
			String nextElement = headerNames.nextElement();
			//System.out.println(nextElement +" : " +request.getHeader(nextElement) );
			tiene = tiene  ||  nextElement.equals("Authorization");
		}
		//Authorization:Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

		return tiene;
	}

	private void printHeader(HttpServletRequest request){
		Enumeration<String> headerNames = request.getHeaderNames();

		System.out.println("***** HEADERS");
		while(headerNames.hasMoreElements()){
			String nextElement = headerNames.nextElement();
			if (nextElement.equals("Authorization")){
				System.out.println("El token es " + request.getHeader(nextElement));
			}
		}

	}
}
