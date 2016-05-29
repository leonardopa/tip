package com.ar.unq.chasqui.few.core.service.example;

import java.util.ArrayList;
import java.util.List;

import com.ar.unq.chasqui.few.core.dto.GrupoDto;
import com.ar.unq.chasqui.few.core.dto.IntegranteDto;

public class GruposServiceMock {

	public List<IntegranteDto> findIntegranes(Integer idGrupo){
		List<IntegranteDto> integrantes = new ArrayList<IntegranteDto>();

		if (idGrupo==0){
			return integrantes;
		}

		String url = "http://lorempixel.com/50/50/people?"+idGrupo+100;
		integrantes.add(new IntegranteDto(1,url,idGrupo + "nombre"+idGrupo, "email@"+idGrupo+".com", true));

		url = "http://lorempixel.com/50/50/people?"+idGrupo+101;
		integrantes.add(new IntegranteDto(2,url,idGrupo + "nombre"+idGrupo, "email@"+idGrupo+".com", true));

		for (int i = 3; i < 10; i++) {
			url = "http://lorempixel.com/50/50/people?"+i;
			integrantes.add(new IntegranteDto(i,url,idGrupo + "nombre"+i, "email@"+i+".com", false));
		}


		return integrantes;
	}

	public List<GrupoDto> findGruposByUser(Integer idUser){

		List<GrupoDto> lista = new ArrayList<GrupoDto>();

		lista.add(new GrupoDto(0,idUser, "Yo", " el burro por delante,  esta puede ser la ficha del usuario individual ", "domicilio del individuo ", true));
		lista.add(new GrupoDto(1,idUser, "Amigos", " Grupo de amigos para comprar cosas buenisimas ", "Siempreviva 123456 3ra A ", true));
		for (int i = 2; i < idUser; i++) {
			lista.add(new GrupoDto(i,idUser, "nombre Grupo"+i, "descripcion del grupo "+i, "domicilio del grupo"+i, false));
		}

		return lista;
	}


}
