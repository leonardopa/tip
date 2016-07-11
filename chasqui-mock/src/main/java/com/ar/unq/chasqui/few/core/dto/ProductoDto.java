package com.ar.unq.chasqui.few.core.dto;

import java.io.Serializable;
import java.util.List;

public class ProductoDto implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	private Integer idProducto;

	private Integer idCategoria;

	private Integer idFabricante;

	private Integer idVariante;

	private String nombreProducto;

	private String nombreCategoria;

	private String nombreFabricante;

	private String nombreVariedad;

	/*
		private String descripcionVariente;
		private String descripcionProducto;
		private String descripcionCateoria;*/
	private Integer stock;

	private Integer precioParteEntera;

	private Integer precioParteDecimal;

	private Double precio;

	private String imagenPrincipal;

	private List<MedallasDto> medallasProducto;

	private List<MedallasDto> medallasProductor;

	public Integer getIdProducto() {
		return idProducto;
	}

	public void setIdProducto(Integer idProducto) {
		this.idProducto = idProducto;
	}

	public Integer getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Integer idCategoria) {
		this.idCategoria = idCategoria;
	}

	public Integer getIdFabricante() {
		return idFabricante;
	}

	public void setIdFabricante(Integer idFabricante) {
		this.idFabricante = idFabricante;
	}

	public Integer getIdVariante() {
		return idVariante;
	}

	public void setIdVariante(Integer idVariante) {
		this.idVariante = idVariante;
	}

	public String getNombreProducto() {
		return nombreProducto;
	}

	public void setNombreProducto(String nombreProducto) {
		this.nombreProducto = nombreProducto;
	}

	public String getNombreCategoria() {
		return nombreCategoria;
	}

	public void setNombreCategoria(String nombreCategoria) {
		this.nombreCategoria = nombreCategoria;
	}

	public String getNombreFabricante() {
		return nombreFabricante;
	}

	public void setNombreFabricante(String nombreFabricante) {
		this.nombreFabricante = nombreFabricante;
	}

	public String getNombreVariedad() {
		return nombreVariedad;
	}

	public void setNombreVariedad(String nombreVariedad) {
		this.nombreVariedad = nombreVariedad;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}

	public Integer getPrecioParteEntera() {
		return precioParteEntera;
	}

	public void setPrecioParteEntera(Integer precioParteEntera) {
		this.precioParteEntera = precioParteEntera;
	}

	public Integer getPrecioParteDecimal() {
		return precioParteDecimal;
	}

	public void setPrecioParteDecimal(Integer precioParteDecimal) {
		this.precioParteDecimal = precioParteDecimal;
	}

	public Double getPrecio() {
		return precio;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}

	public String getImagenPrincipal() {
		return imagenPrincipal;
	}

	public void setImagenPrincipal(String imagenPrincipal) {
		this.imagenPrincipal = imagenPrincipal;
	}

	public List<MedallasDto> getMedallasProducto() {
		return medallasProducto;
	}

	public void setMedallasProducto(List<MedallasDto> medallasProducto) {
		this.medallasProducto = medallasProducto;
	}

	public List<MedallasDto> getMedallasProductor() {
		return medallasProductor;
	}

	public void setMedallasProductor(List<MedallasDto> medallasProductor) {
		this.medallasProductor = medallasProductor;
	}

}
