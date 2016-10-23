package com.ar.unq.chasqui.few.core.dto;

import java.io.Serializable;
import java.util.List;

public class PedidoDto implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	private Integer id;

	private String nombre ;

	private String estado;

	private String creador;

	private String fechaCreacion;

	private Double montoMinimo;

	private Double montoActual;

	private  TipoCompra tipo;

	private List<ProductoPedidoDto> productosResponse;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getCreador() {
		return creador;
	}

	public void setCreador(String creador) {
		this.creador = creador;
	}


	public Double getMontoMinimo() {
		return montoMinimo;
	}

	public void setMontoMinimo(Double montoMinimo) {
		this.montoMinimo = montoMinimo;
	}

	public Double getMontoActual() {
		return montoActual;
	}

	public void setMontoActual(Double montoActual) {
		this.montoActual = montoActual;
	}


	public String getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(String fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public TipoCompra getTipo() {
		return tipo;
	}

	public void setTipo(TipoCompra tipo) {
		this.tipo = tipo;
	}

	public List<ProductoPedidoDto> getProductosResponse() {
		return productosResponse;
	}

	public void setProductosResponse(List<ProductoPedidoDto> productosResponse) {
		this.productosResponse = productosResponse;
	}



}
