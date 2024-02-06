package com.blog.payloads;





import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.Index;
import org.hibernate.validator.constraints.UniqueElements;

import com.blog.entities.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter
@Setter
public class UserDto {
	private int id;
	@NotNull
	@NotEmpty
	@Size(min = 4,message = "Name should be min of 4 characters!!")
	private String name;
	@NotNull
	@NotEmpty
	//@Column(name = "email", nullable = false)
	
	@Email(message = "Email is not valid! please fill the valid Email")
	
	private String email;
	@NotNull
	@NotEmpty
	@NotBlank
	@Size(min = 5,max = 10,message = "Password should be between 5 to 10 characters")
	//@Pattern()
	private String password;
	@NotEmpty
	@NotNull
	private String about;
	
	private Set<RoleDto> roles = new HashSet<>();
	
	@JsonIgnore
	public String getPassword() {
		return this.password;
	}
	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}
	
}
