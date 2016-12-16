package com.ar.unq.chasqui.few.core.service.example;

import java.util.ArrayList;
import java.util.List;

import com.ar.unq.chasqui.few.core.dto.CategoriaDto;
import com.ar.unq.chasqui.few.core.dto.DireccionDto;
import com.ar.unq.chasqui.few.core.dto.MedallasDto;
import com.ar.unq.chasqui.few.core.dto.ProductorDto;
import com.ar.unq.chasqui.few.core.dto.UsuarioFullDto;
import com.ar.unq.chasqui.few.core.dto.apiary.NotificacionesDto;

public class VariosServiceMock {

	String lorem = "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue ....";

	public List<DireccionDto> findDomicilios(Integer idUser) {

		List<DireccionDto> domicilios = new ArrayList<DireccionDto>();

		for (int i = 0; i < 4; i++) {
			domicilios.add(
			        new DireccionDto(i, "alias" + i, "calle" + i, 1, "localidad" + i, "cp" + i, "cpa" + i, -25.123456 + i, 30.123456 + i));
		}

		return domicilios;
	}

	public List<CategoriaDto> findCategorias() {
		List<CategoriaDto> cat = new ArrayList<CategoriaDto>();
		cat.add(new CategoriaDto("1", "aceites"));
		cat.add(new CategoriaDto("2", "bebidas"));
		cat.add(new CategoriaDto("3", "mermeladas"));
		return cat;
	}

	public List<ProductorDto> findProductores() {
		List<ProductorDto> list = new ArrayList<ProductorDto>();
		list.add(new ProductorDto("1", "Mocase-Vía Campesina", "http://lorempixel.com/150/150/business/"));
		list.add(new ProductorDto("2", "Unión de Trabajadores Rurales sin Tierra de Cuyo", "http://lorempixel.com/50/50/business/"));
		list.add(new ProductorDto("3", "Burbuja Latina", "http://lorempixel.com/50/50/business/"));
		list.add(new ProductorDto("4", "Pasta Sur cooperativa EFA Quilmes", "http://lorempixel.com/50/50/business/"));
		list.add(new ProductorDto("5", "Cooperativa Río Paraná", "http://lorempixel.com/50/50/business/"));
		list.add(new ProductorDto("6", "Grisinópoli", "http://lorempixel.com/50/50/business/"));

		return list;
	}

	public List<MedallasDto> findMedallas() {
		List<MedallasDto> list = new ArrayList<MedallasDto>();

		list.add(new MedallasDto("1", "medalla1", "descripcion de la medalla 1 " + lorem, "http://lorempixel.com/50/50/abstract/"));
		list.add(new MedallasDto("2", "medalla2", "descripcion de la medalla 2 " + lorem, "http://lorempixel.com/50/50/abstract/"));
		list.add(new MedallasDto("3", "medalla3", "descripcion de la medalla 3 " + lorem, "http://lorempixel.com/50/50/abstract/"));
		list.add(new MedallasDto("4", "medalla4", "descripcion de la medalla 4 "  + lorem, "http://lorempixel.com/50/50/abstract/"));
		list.add(new MedallasDto("5", "medalla5", "descripcion de la medalla 5 "  + lorem, "http://lorempixel.com/50/50/abstract/"));
		list.add(new MedallasDto("6", "medalla6", "descripcion de la medalla 6 "  + lorem, "http://lorempixel.com/50/50/abstract/"));
		list.add(new MedallasDto("7", "medalla7", "descripcion de la medalla 7 "  + lorem, "http://lorempixel.com/50/50/abstract/"));

		return list;
	}

	public UsuarioFullDto findUser() {
		UsuarioFullDto usuario = new UsuarioFullDto();
		usuario.setApellido("apellido DTO");
		usuario.setEmail("email@aa.com");
		usuario.setNickName("nickNameDTO");
		usuario.setNombre("nombreDto");
		usuario.setTelefonoFijo("123456");
		usuario.setTelefonoMovil("789101112");

		DireccionDto direccion = findDomicilios(1).get(0);
		usuario.setDireccion(direccion);
		return usuario;
	}

	public List<NotificacionesDto> findNotificacionesNoLeidas(Integer pagina) {
		List<NotificacionesDto> list=new ArrayList<>();

		for (int i = (0); i < pagina; i++) {
			list.add(new NotificacionesDto(i, "usuarioOrigen", "usuarioDestino", "Pagina "+pagina +" mensaje"+i, "No Leido"));
		}

		return list;
	}

	public List<NotificacionesDto> findNotificaciones(Integer pagina,Boolean leida) {
		List<NotificacionesDto> list=new ArrayList<>();

		String estado = "No Leido";
		if (leida) estado = "Leido";

		for (int i = (pagina); i <= pagina+5; i++) {
			list.add(new NotificacionesDto(i, "usuarioOrigen", "usuarioDestino", "Pagina "+pagina +" mensaje"+i, estado));
		}

		return list;
	}


}
