package com.ar.unq.chasqui.few.restcalled.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ar.unq.chasqui.few.core.dto.PaginaProductoDto;
import com.ar.unq.chasqui.few.core.dto.PedidoDto;
import com.ar.unq.chasqui.few.core.dto.ProductoDto;
import com.ar.unq.chasqui.few.core.service.example.ProductoServiceMock;

/**
 *
 *
 * @author leo
 */
@RestController
@RequestMapping("/productos")
public class RestProducto {

	private ProductoServiceMock service= new ProductoServiceMock();

	/** Devuelve una lista de producto para la pantalla principal
	 * @author leo
	 * */
	@RequestMapping(value = "/{pagina}/{cantItems}", method = RequestMethod.GET)
	public @ResponseBody PaginaProductoDto findProductos(@PathVariable("pagina") Integer pagina,@PathVariable("cantItems") Integer cantItems) {
		System.out.println(pagina);
		System.out.println(cantItems);

		return service.findProductos(pagina,cantItems);
	}

	@RequestMapping(value = "/destacados", method = RequestMethod.GET)
	public @ResponseBody List<ProductoDto> findProductosDestacados(HttpServletRequest  request)  {
		 //Try this:
	    System.out.println("local " + request.getRequestURL());
	    System.out.println("local " + request.getRequestURI());
	    // or this
	    System.out.println(request.getLocalAddr());;

		return service.findProductosDestacados();
	}

	@RequestMapping(value = "/pedidos/usuario/{idUser}", method = RequestMethod.GET)
	public @ResponseBody List<PedidoDto> findPedidos(@PathVariable("idUser") Integer idUser) {
		return service.findPedidos(idUser);
	}



}
