package com.ar.unq.chasqui.few.core.dto;

public class MedallasDto {

	private String idMedalla;

	private String nombre;

	private String descripcion;

	private String pathImagen;

	public MedallasDto(String idMedalla, String nombre, String descripcion, String pathImagen) {
		super();
		this.idMedalla = idMedalla;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.pathImagen = pathImagen;
	}

	@Override
	public String toString() {
		return "MedallasDto [idMedalla=" + idMedalla + ", nombre=" + nombre + ", descripcion=" + descripcion + ", pathImagen=" + pathImagen
		        + "]";
	}

	public String getIdMedalla() {
		return idMedalla;
	}

	public void setIdMedalla(String idMedalla) {
		this.idMedalla = idMedalla;
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

	public String getPathImagen() {
		return pathImagen;
	}

	public void setPathImagen(String pathImagen) {
		this.pathImagen = pathImagen;
	}

}
