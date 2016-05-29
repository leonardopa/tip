package com.ar.unq.chasqui.few.core.entity.example;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
/** Ejemplo de una entidad para usar como respuesta de un servicio */
@JsonIgnoreProperties(ignoreUnknown = true)
public class GenderGuessResponse implements Serializable {

	private static final long serialVersionUID = 1L;

	private String name;

	private String gender;

	private String description;

	public GenderGuessResponse() {
		// TODO Auto-generated constructor stub
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
