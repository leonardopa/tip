package com.ar.unq.chasqui.few.restcalled.impl;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ar.unq.chasqui.few.core.dto.CategoriaDto;
import com.ar.unq.chasqui.few.core.dto.MedallasDto;
import com.ar.unq.chasqui.few.core.dto.ProductorDto;
import com.ar.unq.chasqui.few.core.dto.UsuarioDto;
import com.ar.unq.chasqui.few.core.dto.UsuarioFullDto;
import com.ar.unq.chasqui.few.core.service.example.VariosServiceMock;

@RestController
public class Varios {

	VariosServiceMock serv = new VariosServiceMock();
	/*
	 *
	 * client/sso/singIn
	 */

	/** Log In - http://docs.chasqui.apiary.io/#reference/0/servicios-publicos/log-in?console=1 */
	@RequestMapping(value = "/client/sso/singIn", method = RequestMethod.POST)
	public @ResponseBody void login(@RequestBody UsuarioFullDto user) {
		System.out.println("Log In " + user);

		// TODO MANEJAR ERRORs

	}

	@RequestMapping(value = "/client/resetPass/{email}", method = RequestMethod.POST)
	public @ResponseBody void login(@PathVariable("email") String email) {
		System.out.println("Reset PASS " + email);

		// TODO MANEJAR ERRORs

	}

	/**
	 * http://168.181.184.203:8080/chasqui/chasqui/rest/client/sso/singUp
	 *
	 * @return
	 */
	@RequestMapping(value = "/client/sso/singUp", method = RequestMethod.POST)
	public @ResponseBody UsuarioDto singUp(@RequestBody UsuarioFullDto user) {
		System.out.println("singUp " + user);

		return new UsuarioDto(user.getEmail(), user.getPassword());
	}

	/**
	 * /chasqui/rest/client/categoria/all/idVendedor
	 */
	@RequestMapping(value = "/client/categoria/all/{idVendedor}", method = RequestMethod.GET)
	public @ResponseBody List<CategoriaDto> findCategorias(@PathVariable("idVendedor") String idVendedor) {
		System.out.println("categoria " + idVendedor);

		return serv.findCategorias();
	}

	/**
	 * /chasqui/rest/client/productor/all/idVendedor
	 */
	@RequestMapping(value = "/client/productor/all/{idVendedor}", method = RequestMethod.GET)
	public @ResponseBody List<ProductorDto> findProductores(@PathVariable("idVendedor") String idVendedor) {
		System.out.println("findProductores " + idVendedor);

		return serv.findProductores();
	}

	/** /chasqui/rest/client/medalla/all
	 * */
	@RequestMapping(value = "/client/medalla/all", method = RequestMethod.GET)
	public @ResponseBody List<MedallasDto> findMedallas() {
		System.out.println("findMedallas ");

		return serv.findMedallas();
	}
}
