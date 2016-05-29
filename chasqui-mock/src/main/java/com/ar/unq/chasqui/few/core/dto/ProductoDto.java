package com.ar.unq.chasqui.few.core.dto;

import java.io.Serializable;


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
	private String nombreVariente;
	private String descripcionVariente;
	private String descripcionProducto;
	private String descripcionCateoria;
	private Integer precioParteEntera;
	private Integer precioParteDecimal;

	public Integer getIdProducto() {
		return idProducto;
	}

	public void setIdProducto(Integer idProducto) {
		this.idProducto = idProducto;
	}

	public String getNombreProducto() {
		return nombreProducto;
	}

	public void setNombreProducto(String nombreProducto) {
		this.nombreProducto = nombreProducto;
	}

	public Integer getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Integer idCategoria) {
		this.idCategoria = idCategoria;
	}

	public String getNombreCategoria() {
		return nombreCategoria;
	}

	public void setNombreCategoria(String nombreCategoria) {
		this.nombreCategoria = nombreCategoria;
	}

	public String getDescripcionProducto() {
		return descripcionProducto;
	}

	public void setDescripcionProducto(String descripcionProducto) {
		this.descripcionProducto = descripcionProducto;
	}

	public String getDescripcionCateoria() {
		return descripcionCateoria;
	}

	public void setDescripcionCateoria(String descripcionCateoria) {
		this.descripcionCateoria = descripcionCateoria;
	}

	public String getNombreFabricante() {
		return nombreFabricante;
	}

	public void setNombreFabricante(String nombreFabricante) {
		this.nombreFabricante = nombreFabricante;
	}

	public Integer getIdFabricante() {
		return idFabricante;
	}

	public void setIdFabricante(Integer idFabricante) {
		this.idFabricante = idFabricante;
	}

	public String getNombreVariente() {
		return nombreVariente;
	}

	public void setNombreVariente(String nombreVariente) {
		this.nombreVariente = nombreVariente;
	}

	public String getDescripcionVariente() {
		return descripcionVariente;
	}

	public void setDescripcionVariente(String descripcionVariente) {
		this.descripcionVariente = descripcionVariente;
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

	public Integer getIdVariante() {
		return idVariante;
	}

	public void setIdVariante(Integer idVariante) {
		this.idVariante = idVariante;
	}

}
