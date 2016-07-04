package com.ar.unq.chasqui.few.core.dto;


public class ProductorDto {


	private String idVendedor;
	private String nombreProductor;
	private String pathImagen;

	public ProductorDto(String idVendedor, String nombreProductor, String pathImagen) {
		super();
		this.idVendedor = idVendedor;
		this.nombreProductor = nombreProductor;
		this.pathImagen = pathImagen;
	}

	@Override
	public String toString() {
		return "ProductorDto [idVendedor=" + idVendedor + ", nombreProductor=" + nombreProductor + ", pathImagen=" + pathImagen + "]";
	}

	public String getIdVendedor() {
		return idVendedor;
	}

	public void setIdVendedor(String idVendedor) {
		this.idVendedor = idVendedor;
	}

	public String getNombreProductor() {
		return nombreProductor;
	}

	public void setNombreProductor(String nombreProductor) {
		this.nombreProductor = nombreProductor;
	}

	public String getPathImagen() {
		return pathImagen;
	}

	public void setPathImagen(String pathImagen) {
		this.pathImagen = pathImagen;
	}





}
