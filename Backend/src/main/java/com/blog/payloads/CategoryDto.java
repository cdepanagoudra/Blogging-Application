package com.blog.payloads;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@Getter
@Setter

public class CategoryDto {
	private Integer id;
	@NotBlank
	@Size(min=4,max = 10)
	private String title;
	@NotBlank
	@Size(max = 40)
	private String description;
}
