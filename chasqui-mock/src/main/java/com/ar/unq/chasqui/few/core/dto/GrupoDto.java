package com.ar.unq.chasqui.few.core.dto;

import java.io.Serializable;

public class GrupoDto implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	/**Es el usuario que pide la informacion del grupo */
	private Integer idUsuarioQuery;

	private String nombre;

	private String descripcion;

    private String domicilio;

    private boolean isAdmin;

    private Integer id;

    private String urlImagen = "http://lorempixel.com/150/150/business/";


	public GrupoDto() {

	}

	public GrupoDto(Integer id,Integer idUsuarioQuery, String nombre, String descripcion, String domicilio, boolean isAdmin) {
		super();
		this.idUsuarioQuery = idUsuarioQuery;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.domicilio = domicilio;
		this.isAdmin = isAdmin;
		this.id=id;

	}


	public Integer getIdUsuarioQuery() {
		return idUsuarioQuery;
	}


	public void setIdUsuarioQuery(Integer idUsuarioQuery) {
		this.idUsuarioQuery = idUsuarioQuery;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public String getDescripcion() {
		return descripcion;
	}


	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}


	public String getDomicilio() {
		return domicilio;
	}


	public void setDomicilio(String domicilio) {
		this.domicilio = domicilio;
	}


	public boolean isAdmin() {
		return isAdmin;
	}


	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}

	public String getUrlImagen() {
		return urlImagen;
	}

	public void setUrlImagen(String urlImagen) {
		this.urlImagen = urlImagen;
	}



}
