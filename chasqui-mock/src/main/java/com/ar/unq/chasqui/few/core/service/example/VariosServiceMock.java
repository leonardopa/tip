package com.ar.unq.chasqui.few.core.service.example;

import java.util.ArrayList;
import java.util.List;

import com.ar.unq.chasqui.few.core.dto.DireccionDto;

public class VariosServiceMock {

	public List<DireccionDto> findDomicilios(Integer idUser){

		List<DireccionDto> domicilios = new ArrayList<DireccionDto>();

		for (int i = 0; i < 4; i++) {
			domicilios.add(new DireccionDto(i, "alias"+i, "calle"+i, 1, "localidad"+i, "cp"+i, "cpa"+i,-25.123456+i, 30.123456+i));
		}

		return domicilios;
	}


}
