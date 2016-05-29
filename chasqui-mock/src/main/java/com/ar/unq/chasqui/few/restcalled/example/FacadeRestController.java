package com.ar.unq.chasqui.few.restcalled.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ar.unq.chasqui.few.core.entity.example.ProductoResponse;
import com.ar.unq.chasqui.few.core.service.example.NamesService;

/**
 * Ejemplo de como exponer servicios REST
 * 
 * @author leo
 */
// TODO: usaria como nomenclaruta domino+controller . ExampleGenderController,
@RestController
@RequestMapping("/ejemplo")
public class FacadeRestController {
	@Autowired
	private NamesService namesService;

//	public FacadeRestController() {
//		namesService = ((NamesService) ApplicationContextProvider.getApplicationContext().getBean("namesService"));
//	}

	@RequestMapping(value = "/api/hello_world/{name}", method = RequestMethod.GET)
	public ResponseEntity<String> helloWorld(@PathVariable("name") String name) {
		return new ResponseEntity<String>(namesService.helloWorld(name), org.springframework.http.HttpStatus.OK);
	}

	@RequestMapping(value = "/api/gender_guess/{name}", method = RequestMethod.GET)
	public ResponseEntity<String> genderGuess(@PathVariable("name") String name) {
		return new ResponseEntity<String>(namesService.guessGender(name), org.springframework.http.HttpStatus.OK);
	}

	/**
	 * MOCK - Servicio REST que devuelve un Ticket para el appTouch viejo
	 *
	 * @author leonardopa
	 */
	@RequestMapping(value = "/api/producto/{userId}", method = RequestMethod.GET)
	public @ResponseBody ProductoResponse ticket(@PathVariable("userId") String userId) {
		return namesService.crearProducto(userId);
	}

	public NamesService getNamesService() {
		return namesService;
	}

	public void setNamesService(NamesService namesService) {
		this.namesService = namesService;
	}

}
