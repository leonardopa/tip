package com.ar.unq.chasqui.few.restcalled.impl;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ar.unq.chasqui.few.core.dto.DireccionDto;
import com.ar.unq.chasqui.few.core.service.example.VariosServiceMock;
import com.ar.unq.chasqui.few.restcalled.RestDireccion;

/**
 * Servicios relacionados a domicilios. Para usuarios , cliente , fabricante
 *
 * @author leo
 *
 */
@CrossOrigin
@RestController
@RequestMapping("/direccion")
public class RestDireccionMockImpl implements RestDireccion  {

	private VariosServiceMock service = new VariosServiceMock();

	/** Devuelve los domicilio de un usuario */
	@Override
	@RequestMapping(value = "/usuario/{idUsuario}/", method = RequestMethod.GET)
	public @ResponseBody List<DireccionDto> findDireccion(@PathVariable("idUsuario") Integer idUsuario) {
		return service.findDomicilios(idUsuario);
	}

	/** Agregar el domicilio de un grupo */
	@Override
	@RequestMapping(value = "/usuario/{idUsuario}/", method = RequestMethod.POST)
	public @ResponseBody void postDireccionUsuraio(@PathVariable("idUsuario") Integer idUsuario,@RequestBody DireccionDto input) {
		System.out.println("agrego domiciio a usuario");
		System.out.println(idUsuario);
		System.out.println(input);

	}

	/** Agregar el domicilio de un grupo */
	@Override
	@RequestMapping(value = "/grupo/{idGrupo}/", method = RequestMethod.POST)
	public @ResponseBody void postDireccionGrupo(@PathVariable("idGrupo") Integer idGrupo, @RequestBody DireccionDto input) {
		System.out.println("agrego domiciio a Grupo");
		System.out.println(idGrupo);
		System.out.println(input);
	}

	/** Modifica un domicilo */
	@Override
	@RequestMapping(value = "/{idDireccion}/", method = RequestMethod.PUT)
	public @ResponseBody void putDireccion(@RequestBody DireccionDto input) {
		System.out.println("actulizando domicilio");
		System.out.println(input);

	}

}
