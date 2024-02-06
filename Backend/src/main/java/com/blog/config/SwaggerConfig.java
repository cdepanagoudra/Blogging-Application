package com.blog.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

//	String apiTitle;
//	 String apiDescription;
//	String apiVersion; 
//	String apiContactName;
//	String apiContactEmail;
//	String apiContactUrl;
//	private SecurityScheme createAPIKeyScheme() {
//	    return new SecurityScheme().type(SecurityScheme.Type.HTTP)
//	        
//	        .scheme("Bearer")
//	        
//	        ;
//	}
	
	@Bean
	public OpenAPI customOpenAPI(

	) {
		return new OpenAPI().addSecurityItem(new SecurityRequirement().addList("bearer-jwt", Arrays.asList("read", "write")))
				
				.components(new Components().addSecuritySchemes("bearer-jwt", new SecurityScheme()
	                    .type(SecurityScheme.Type.HTTP)
	                    .scheme("bearer")
	                    .bearerFormat("JWT")))
				.info(new Info().title("Blogging Application : Backend Course")
						.description("This Project is built by chetan depanagoudra")
						.version("1.0")
						.contact(new Contact().name("Chetan").email("chetan@gmail.com").url("chetan.com")));
	}
	
	
	
//			@Value("${apiTitle}") String apiTitle,
//			@Value("${apiTitle}") String apiDescription, 
//			@Value("${apiTitle}")String apiVersion, 
//			@Value("${apiTitle}")String apiContactName,
//			@Value("${apiTitle}")String apiContactEmail,
//			@Value("${apiTitle}")String apiContactUrl) {
//		this.apiTitle= apiTitle;
//		this.apiDescription= apiDescription;
//		this.apiVersion = apiVersion;
//		this.apiContactName = apiContactName;
//		this.apiContactEmail = apiContactEmail;
//		this.apiContactUrl = apiContactUrl;
	

}
