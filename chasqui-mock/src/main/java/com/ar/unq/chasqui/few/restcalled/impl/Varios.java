package com.ar.unq.chasqui.few.restcalled.impl;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ar.unq.chasqui.few.core.dto.UsuarioDto;
import com.ar.unq.chasqui.few.core.dto.UsuarioFullDto;

@RestController
public class Varios {



	/*
	 *
	 * client/sso/singIn
	 */

	/**Log In - http://docs.chasqui.apiary.io/#reference/0/servicios-publicos/log-in?console=1*/
	@RequestMapping(value = "/client/sso/singIn", method = RequestMethod.POST)
	public @ResponseBody void login(@RequestBody UsuarioFullDto user) {
		System.out.println("Log In " + user);

		//TODO MANEJAR ERRORs

	}

	@RequestMapping(value = "/client/resetPass/{email}", method = RequestMethod.POST)
	public @ResponseBody void login(@PathVariable("email") String email) {
		System.out.println("Reset PASS " + email);

		//TODO MANEJAR ERRORs

	}

	/**
	 * http://168.181.184.203:8080/chasqui/chasqui/rest/client/sso/singUp
	 * @return
	 * */
	@RequestMapping(value = "/client/sso/singUp", method = RequestMethod.POST)
	public @ResponseBody UsuarioDto singUp(@RequestBody UsuarioFullDto user) {
		System.out.println("singUp " + user);

		return new UsuarioDto(user.getEmail(), user.getPassword());
	}



}
