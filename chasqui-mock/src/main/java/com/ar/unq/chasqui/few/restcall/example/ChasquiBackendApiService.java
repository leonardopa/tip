package com.ar.unq.chasqui.few.restcall.example;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ar.unq.chasqui.few.core.entity.example.GenderGuessResponse;
/** Ejemplo de un servicio que sabe llamar a otro via REST.
 *  Dado un nombre devuelve el genero */ 
@Service
public class ChasquiBackendApiService implements BackendApiService {

	private String apiUrl;

	private String xMashapeKey;

	private String contentType;

	@Override
	public String guessGender(String name) {
		String serviceUrl = apiUrl + name;
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.set("Content-Type", contentType);
		headers.set("X-Mashape-Key", xMashapeKey);

		HttpEntity<?> entity = new HttpEntity<>(headers);

		HttpEntity<GenderGuessResponse> response = restTemplate.exchange(serviceUrl, HttpMethod.GET, entity, GenderGuessResponse.class);

		return response.getBody().getGender();

	}

	public String getApiUrl() {
		return apiUrl;
	}

	public void setApiUrl(String apiUrl) {
		this.apiUrl = apiUrl;
	}

	public String getxMashapeKey() {
		return xMashapeKey;
	}

	public void setxMashapeKey(String xMashapeKey) {
		this.xMashapeKey = xMashapeKey;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

}
