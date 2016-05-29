package com.ar.unq.chasqui.few.api.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/** Core el core con springbot . */
@SpringBootApplication
public class API {

	public static void main(String[] args) {
		@SuppressWarnings({ "unused", "resource" })
		AbstractApplicationContext ctx = new ClassPathXmlApplicationContext("application-context.xml");
		SpringApplication.run(API.class, args);

		System.out.println("********************************");
		System.out.println("Proba !");
		System.out.println("http://localhost:8080/api/hello_world/leo");
		System.out.println("http://localhost:8080/api/gender_guess/leo");
		System.out.println("http://localhost:8080/api/gender_guess/ana");
		System.out.println("http://localhost:8080/api/producto/{userId}");
		
		System.out.println("********************************");
	}

}
