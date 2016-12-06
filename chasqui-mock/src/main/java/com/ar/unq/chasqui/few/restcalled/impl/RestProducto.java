package com.ar.unq.chasqui.few.restcalled.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ar.unq.chasqui.few.core.dto.Config;
import com.ar.unq.chasqui.few.core.dto.PedidoDto;
import com.ar.unq.chasqui.few.core.dto.ProductoDto;
import com.ar.unq.chasqui.few.core.dto.apiary.PaginaProductoDto;
import com.ar.unq.chasqui.few.core.service.example.ProductoServiceMock;

/**
 *
 *
 * @author leo
 */@CrossOrigin
@RestController
@RequestMapping("/productos")
public class RestProducto {

	private ProductoServiceMock service = new ProductoServiceMock();

	/**
	 * Devuelve una lista de producto para la pantalla principal
	 *
	 * @author leo
	 */
	@RequestMapping(value = "/{pagina}/{cantItems}", method = RequestMethod.GET)
	public @ResponseBody PaginaProductoDto findProductos(@PathVariable("pagina") Integer pagina,
	        @PathVariable("cantItems") Integer cantItems) {
		System.out.println(pagina);
		System.out.println(cantItems);

		return service.findProductos(pagina, cantItems);
	}

	@RequestMapping(value = "/destacados", method = RequestMethod.GET)
	public @ResponseBody List<ProductoDto> findProductosDestacados(HttpServletRequest request) {
		return service.findProductosDestacados();
	}

	@RequestMapping(value = "/pedidos/usuario/{idUser}", method = RequestMethod.GET)
	public @ResponseBody List<PedidoDto> findPedidos(@PathVariable("idUser") Integer idUser) {
		return service.findPedidos(idUser);
	}

	@RequestMapping(value = "/pedido/{idPedido}/usuario/{idUser}/quitarProducto/{cantidad}", method = RequestMethod.POST)
	public @ResponseBody void quitarProducto(@PathVariable("idUser") Integer idUser, @PathVariable("idPedido") Integer idPedido,
			@PathVariable("cantidad") Integer cantidad, @RequestBody ProductoDto producto) {
		System.out.println("quitar idUser " +idUser);
		System.out.println("quitar  idPedido " +idPedido);
		System.out.println("quitar  cantidad " +cantidad);
		System.out.println("quitar " +producto);
		// return service.findPedidos(idUser);
	}

	@RequestMapping(value = "/pedido/{idPedido}/usuario/{idUser}/agregarProducto/{cantidad}", method = RequestMethod.POST)
	public @ResponseBody Integer agregarProducto(@PathVariable("idUser") Integer idUser, @PathVariable("idPedido") Integer idPedido,
			@PathVariable("cantidad") Integer cantidad,@RequestBody ProductoDto producto) {
		System.out.println("agregar idUser " +idUser);
		System.out.println("agregar  idPedido " +idPedido);
		System.out.println("agregar  cantidad " +cantidad);
		System.out.println("agregar " +producto);
		// return service.findPedidos(idUser);
		return 0;
	}

	@RequestMapping(value = "/config", method = RequestMethod.GET)
	public @ResponseBody Config config(HttpServletRequest request) {
		// Ejemplo de como saber que Vendedor es
		System.out.println("local " + request.getRequestURL());
		System.out.println("local " + request.getRequestURI());
		System.out.println("local " + request.getServerName());
		System.out.println("local " + request.getLocalName());
		System.out.println("local " + request.getPathInfo());
		System.out.println(request.getLocalAddr());


		return findConfig(request.getServerName());
	}

	private Config findConfig(String serverName) {

		if ("MatLock".equalsIgnoreCase(serverName)) return new Config(2, "MatLock", "/imagenes/usuarios/ROOT/perfil.jpg");
		if ("damian".equalsIgnoreCase(serverName)) return new Config(4, "damian", null);
		if ("adminpds".equalsIgnoreCase(serverName)) return new Config(6, "adminpds", "/imagenes/usuarios/adminpds/chaqui-logo-15.png");
		if ("prueba".equalsIgnoreCase(serverName)) return new Config(7, "prueba", null);
		if ("mercado".equalsIgnoreCase(serverName)) return new Config(10, "mercado", "/imagenes/usuarios/mercado/logoMT.png");

		//por defecto es PDS
		return new Config(6, "adminpds", "/imagenes/usuarios/adminpds/chaqui-logo-15.png");
	}

}
