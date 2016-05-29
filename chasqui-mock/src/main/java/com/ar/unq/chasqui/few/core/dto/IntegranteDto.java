package com.ar.unq.chasqui.few.core.dto;

import java.io.Serializable;

public class IntegranteDto implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 7351583322599671612L;

	private Integer id;

	private String urlImagen;

	private String nombre;

	private String email;

	private Boolean isEnGrupo;

	public IntegranteDto() {
		// TODO Auto-generated constructor stub
	}

	public IntegranteDto(Integer id,String urlImagen, String nombre, String email, Boolean isEnGrupo) {
		super();
		this.urlImagen = urlImagen;
		this.nombre = nombre;
		this.email = email;
		this.isEnGrupo = isEnGrupo;
		this.id=id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getIsEnGrupo() {
		return isEnGrupo;
	}

	public void setIsEnGrupo(Boolean isEnGrupo) {
		this.isEnGrupo = isEnGrupo;
	}

	public String getUrlImagen() {
		return urlImagen;
	}

	public void setUrlImagen(String urlImagen) {
		this.urlImagen = urlImagen;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}
