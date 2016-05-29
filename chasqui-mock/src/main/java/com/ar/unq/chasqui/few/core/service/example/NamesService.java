package com.ar.unq.chasqui.few.core.service.example;

import com.ar.unq.chasqui.few.core.entity.example.ProductoResponse;

public interface NamesService {

	public String helloWorld(String name);

	public String guessGender(String name);

	ProductoResponse crearProducto(String userId);
}
