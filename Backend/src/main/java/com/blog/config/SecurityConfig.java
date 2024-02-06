package com.blog.config;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.blog.security.CustomUserDetailService;
import com.blog.security.JwtAuthenticationEntryPoint;
import com.blog.security.JwtAuthenticationFilter;



@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@EnableWebMvc
public class SecurityConfig {
	public static final String[] PUBLIC_URLS= {
			
			"/api/v1/auth/**",
			"/v3/api-docs",
			"/v2/api-docs",
			"/swagger-resources/**",
			"/swagger-ui/**",
			"/webjars/**"
	};
	@Autowired
	private CustomUserDetailService customUserDetailService;
	@Autowired
	private JwtAuthenticationEntryPoint authenticationEntryPoint;
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        		.csrf(AbstractHttpConfigurer::disable)
        		
                .authorizeHttpRequests((requests)->
                        // Secure specific endpoints with different configurations
                requests
                        // Allow public access
                        .requestMatchers(PUBLIC_URLS).permitAll()// Require authentication for private endpoints
                        
                        .requestMatchers(HttpMethod.GET).permitAll()
                        .anyRequest()
                        .authenticated()
                        )
               
                .exceptionHandling(handling -> handling.authenticationEntryPoint(this.authenticationEntryPoint))
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		
		http.addFilterBefore(this.jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
	@Bean
	public AuthenticationManager authmanager() {
		DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
		daoProvider.setUserDetailsService(this.customUserDetailService);
		daoProvider.setPasswordEncoder(passwordEncoder());
		return new ProviderManager(daoProvider);
	}
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	public FilterRegistrationBean coresFilter(){
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration corsConfiguration = new CorsConfiguration(); 
		corsConfiguration.setAllowCredentials(true);
		
		corsConfiguration.addAllowedOriginPattern("*");
		corsConfiguration.addAllowedHeader("Authorization");
		corsConfiguration.addAllowedHeader("Content-Type");
		corsConfiguration.addAllowedHeader("Accept");
		corsConfiguration.addAllowedMethod("POST");
		corsConfiguration.addAllowedMethod("GET");
		corsConfiguration.addAllowedMethod("DELETE");
		corsConfiguration.addAllowedMethod("PUT");
		corsConfiguration.addAllowedMethod("OPTIONS");
		corsConfiguration.setMaxAge(3600L);
		source.registerCorsConfiguration("/**",corsConfiguration);
		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
		
		bean.setOrder(-110);
		return bean;
	}
	
	
	
	
	
	
	

	
	
}
