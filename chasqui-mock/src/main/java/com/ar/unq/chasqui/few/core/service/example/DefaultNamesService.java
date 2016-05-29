package com.ar.unq.chasqui.few.core.service.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ar.unq.chasqui.few.core.entity.example.ProductoResponse;
import com.ar.unq.chasqui.few.core.entity.example.ProductoReturnObject;
import com.ar.unq.chasqui.few.restcall.example.BackendApiService;

/** Servicio de logica de negocio*/
@Service
public class DefaultNamesService implements NamesService {
	@Autowired
	private BackendApiService backendApiService;

	private Integer precio=0;
	
	/**
	 * ejemplo sin invocar la API
	 */
	@Override
	public String helloWorld(String name) {
		return "Hello World, " + name + "!";
	}

	/**
	 * ejemplo invocando la API, podría agregar lógica intermedia
	 */
	@Override
	public String guessGender(String name) {
		return "The gender is " + backendApiService.guessGender(name);
	}

	@Override
	public ProductoResponse crearProducto(String userId) {
		precio++;
		ProductoReturnObject info = new ProductoReturnObject(precio*1000, "producto para user "  + userId,precio);
		ProductoResponse producto = new ProductoResponse(info);

		return producto;
	}

	public BackendApiService getBackendApiService() {
		return backendApiService;
	}

	public void setBackendApiService(BackendApiService backendApiService) {
		this.backendApiService = backendApiService;
	}
}
