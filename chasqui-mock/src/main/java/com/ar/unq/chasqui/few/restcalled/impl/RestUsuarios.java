package com.ar.unq.chasqui.few.restcalled.impl;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ar.unq.chasqui.few.core.dto.GrupoDto;
import com.ar.unq.chasqui.few.core.dto.IntegranteDto;
import com.ar.unq.chasqui.few.core.service.example.GruposServiceMock;

/**
 * Servicios relacionados a usuarios
 *
 * @author leo
 *
 */
@CrossOrigin
@RestController
@RequestMapping("/usuarios")
public class RestUsuarios {

	private GruposServiceMock service = new GruposServiceMock();


	/////////// GRUPOS //////////
	/**Agregar un grupo nuevo a un usuario. Este usuario sera el ADMIN*/
	@RequestMapping(value = "/{idUsuario}/grupos/", method = RequestMethod.POST)
	public @ResponseBody Integer postGrupo(@PathVariable("idUsuario") Integer idUsuario,@RequestBody GrupoDto grupo) {
		System.out.println(" crear grupo a usuario " + idUsuario);
		System.out.println(" crear grupo a usuario " + grupo);

		return 0;
	}

	/**Modificar un grupo*/
	@RequestMapping(value = "/grupos/{idGrupo}/", method = RequestMethod.PUT)
	public @ResponseBody void putGrupo(@PathVariable("idUsuario") Integer idGrupo,@RequestBody GrupoDto grupo) {
		System.out.println(" actualiza grupo a usuario " + idGrupo);
		System.out.println(" actualiza grupo a usuario " + grupo);


	}


	/**Devuelve la lista de grupos de un usuario.
	 * Tiene un Flag que identifica si el usuario es el ADMIN del grupo */
	@RequestMapping(value = "/{idUsuario}/grupos/", method = RequestMethod.GET)
	public @ResponseBody List<GrupoDto> findGrupos(@PathVariable("idUsuario") Integer idUsuario) {
		return service.findGruposByUser(idUsuario);
	}

	/**Saca a el usuario de un grupo determinado */
	@RequestMapping(value = "/{idUsuario}/grupos/{idGrupo}/salir", method = RequestMethod.GET)
	public @ResponseBody void salirDelGrupo(@PathVariable("idUsuario") Integer idUsuario,@PathVariable("idGrupo") Integer idGrupo) {
		System.out.println("se fue !" + idUsuario +" del grupo " + idGrupo);
		//return service.findGruposByUser(idUsuario);
	}



	////////////// INTEGRANTES

    /**Devuelve los integrantes de un grupo
     *  */
	@RequestMapping(value = "/grupos/{idGrupo}/integrantes", method = RequestMethod.GET)
	public @ResponseBody List<IntegranteDto> findIntegrantes(@PathVariable("idGrupo") Integer idGrupo) {
		//TODO: se le puede pasar el id del usuario para que no aparezca en la lista
		return service.findIntegranes(idGrupo);
	}

	/**Agregar Integrantes a un grupo*/
	@RequestMapping(value = "/grupos/{idGrupo}/integrantes", method = RequestMethod.POST)
	public @ResponseBody void postGrupo(@RequestBody List<IntegranteDto> input) {
		//TODO: en realidad esto no va, por que sea via mail y luego lo hace el core
		System.out.println(input);
		for (IntegranteDto integrante : input) {
			System.out.println(integrante.getNombre());
		}
	}

	/**Actualiza los integrantes del grupo */
	@RequestMapping(value = "/grupos/{idGrupo}/integrantes", method = RequestMethod.PUT)
	public @ResponseBody void updateGrupo(@RequestBody List<IntegranteDto> input) {
		//TODO: en realidad esto no va, por que sea via mail y luego lo hace el core
		System.out.println(input);
	}






}
