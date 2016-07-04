package com.ar.unq.chasqui.few.core.dto;


public class CategoriaDto {


	private String idCategoria ;
	private String nombre;




	public CategoriaDto(String idCategoria, String nombre) {
		super();
		this.idCategoria = idCategoria;
		this.nombre = nombre;
	}

	public String getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(String idCategoria) {
		this.idCategoria = idCategoria;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}



}
