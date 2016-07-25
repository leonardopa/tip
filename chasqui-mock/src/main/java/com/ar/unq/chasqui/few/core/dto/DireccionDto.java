package com.ar.unq.chasqui.few.core.dto;

import java.io.Serializable;

/** @author leo */
public class DireccionDto implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	private Integer id;

	private String alias;

	private String calle;

	private Integer altura;

	private String departamento;

	private String localidad;

	private String cp;

	private String cpa;

	private Double latitud;

	private Double longitud;

	private Boolean predeterminada=false;

	public DireccionDto() {
		// TODO Auto-generated constructor stub
	}
	public DireccionDto(Integer id, String alias, String calle, Integer altura, String localidad, String cp, String cpa, Double latitud,
	        Double longitud) {
		super();
		this.id = id;
		this.alias = alias;
		this.calle = calle;
		this.altura = altura;
		this.localidad = localidad;
		this.cp = cp;
		this.cpa = cpa;
		this.latitud = latitud;
		this.longitud = longitud;
	}




	@Override
	public String toString() {
		return "DireccionDto [id=" + id + ", alias=" + alias + ", calle=" + calle + ", altura=" + altura + ", departamento=" + departamento
		        + ", localidad=" + localidad + ", cp=" + cp + ", cpa=" + cpa + ", latitud=" + latitud + ", longitud=" + longitud
		        + ", predeterminada=" + predeterminada + "]";
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCalle() {
		return calle;
	}

	public void setCalle(String calle) {
		this.calle = calle;
	}

	public Integer getAltura() {
		return altura;
	}

	public void setAltura(Integer altura) {
		this.altura = altura;
	}

	public String getLocalidad() {
		return localidad;
	}

	public void setLocalidad(String localidad) {
		this.localidad = localidad;
	}

	public Double getLatitud() {
		return latitud;
	}

	public void setLatitud(Double latitud) {
		this.latitud = latitud;
	}

	public Double getLongitud() {
		return longitud;
	}

	public void setLongitud(Double longitud) {
		this.longitud = longitud;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getCpa() {
		return cpa;
	}

	public void setCpa(String cpa) {
		this.cpa = cpa;
	}

	public String getCp() {
		return cp;
	}

	public void setCp(String cp) {
		this.cp = cp;
	}

	public String getDepartamento() {
		return departamento;
	}

	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}
	public Boolean getPredeterminada() {
		return predeterminada;
	}
	public void setPredeterminada(Boolean predeterminada) {
		this.predeterminada = predeterminada;
	}


}
