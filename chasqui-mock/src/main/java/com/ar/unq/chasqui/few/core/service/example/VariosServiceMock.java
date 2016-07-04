package com.ar.unq.chasqui.few.core.service.example;

import java.util.ArrayList;
import java.util.List;

import com.ar.unq.chasqui.few.core.dto.CategoriaDto;
import com.ar.unq.chasqui.few.core.dto.DireccionDto;
import com.ar.unq.chasqui.few.core.dto.MedallasDto;
import com.ar.unq.chasqui.few.core.dto.ProductorDto;

public class VariosServiceMock {

	public List<DireccionDto> findDomicilios(Integer idUser){

		List<DireccionDto> domicilios = new ArrayList<DireccionDto>();

		for (int i = 0; i < 4; i++) {
			domicilios.add(new DireccionDto(i, "alias"+i, "calle"+i, 1, "localidad"+i, "cp"+i, "cpa"+i,-25.123456+i, 30.123456+i));
		}

		return domicilios;
	}


	public List<CategoriaDto> findCategorias() {
		List<CategoriaDto> cat=new ArrayList<CategoriaDto>();
		cat.add(new CategoriaDto("1","aceites"));
		cat.add(new CategoriaDto("2","bebidas"));
		cat.add(new CategoriaDto("3","mermeladas"));
		return cat;
	}


	public List<ProductorDto> findProductores() {
		List<ProductorDto> list = new ArrayList<ProductorDto>();
		list.add(new ProductorDto("1", "Mocase-Vía Campesina", "http://lorempixel.com/50/50/business/"));
		list.add(new ProductorDto("2", "Unión de Trabajadores Rurales sin Tierra de Cuyo", "http://lorempixel.com/50/50/business/"));
		list.add(new ProductorDto("3", "Burbuja Latina", "http://lorempixel.com/50/50/business/"));
		list.add(new ProductorDto("4", "Pasta Sur cooperativa EFA Quilmes", "http://lorempixel.com/50/50/business/"));
		list.add(new ProductorDto("5", "Cooperativa Río Paraná", "http://lorempixel.com/50/50/business/"));
		list.add(new ProductorDto("6", "Grisinópoli", "http://lorempixel.com/50/50/business/"));


		return list;
	}


	public List<MedallasDto> findMedallas() {
		List<MedallasDto> list = new ArrayList<MedallasDto>();

		list.add(new MedallasDto("1", "medalla1", "descripcion de la medalla 1", "http://lorempixel.com/50/50/abstract/"));
		list.add(new MedallasDto("2", "medalla2", "descripcion de la medalla 2", "http://lorempixel.com/50/50/abstract/"));
		list.add(new MedallasDto("3", "medalla3", "descripcion de la medalla 3", "http://lorempixel.com/50/50/abstract/"));
		list.add(new MedallasDto("4", "medalla4", "descripcion de la medalla 4", "http://lorempixel.com/50/50/abstract/"));

		return list;
	}

}
