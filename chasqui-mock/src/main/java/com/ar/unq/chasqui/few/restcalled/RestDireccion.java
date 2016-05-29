package com.ar.unq.chasqui.few.restcalled;

import java.util.List;

import com.ar.unq.chasqui.few.core.dto.DireccionDto;

public interface RestDireccion {

	List<DireccionDto> findDireccion(Integer idUsuario);

	void postDireccionUsuraio(Integer idUsuario, DireccionDto input);

	void postDireccionGrupo(Integer idGrupo, DireccionDto input);

	void putDireccion(DireccionDto input);

}
