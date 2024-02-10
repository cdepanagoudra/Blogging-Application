![enter image description here](https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-600nw-1029506242.jpg)
<h3 align="left">Languages and Tools:</h3>  
<p align="left"> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.java.com" target="_blank" rel="noreferrer"> <img    src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://spring.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="spring" width="40" height="40"/> </a> </p>

# Blogify: Your Personal Blogging Platform
Blogify is a modern and user-friendly web application designed to empower individuals and organizations to express themselves through the art of blogging. With a sleek and intuitive interface, robust features, and advanced functionalities, Blogify offers an unparalleled platform for writers, bloggers, and content creators to share their thoughts, ideas, and stories with the world.

## How to run the app
 1. Either fork or download the app and open the project in the IDE's like eclipse, sts...
 2. Install all the dependencies, you can use a build automation tool like Maven or Gradle to download and manage those dependencies for you. 
	### Using Maven :
    > Open a terminal or command prompt.
    > Navigate to the root directory of your Spring Boot project.
    > Run the following command to build the project and download dependencies:`mvn clean install`.
    > Once the command completes successfully, you should see a message indicating that the build was successful and the project dependencies were downloaded.
    
    ### Using Gradle : 
    > Open a terminal or command prompt.
    > Navigate to the root directory of your Spring Boot project.
    > Run the following command to build the project and download dependencies:`gradlew build`.
    > Once the command completes successfully, you should see a message indicating that the build was successful and the project dependencies were downloaded.
	
 3. Database Connection Configuration:
	 Before running the Spring Boot application, you need to configure the database connection settings in the `application.properties` file. Follow the instructions below to set up the database connection:
	 1.  Open the `application.properties` file:
    
    -   Navigate to the `src/main/resources` directory in your Spring Boot project and locate the `application.properties` file.
    - Replace the following configuration properties:
    `spring.datasource.url`=jdbc:mysql://localhost:3306/mydatabase 	`spring.datasource.username`=root 
    `spring.datasource.password`=root 
    `spring.datasource.driver-class-name`=com.mysql.cj.jdbc.Driver
    `spring.datasource.driver-class-name`: Specifies the fully qualified name of the JDBC driver class for MySQL. For other databases, uncomment and use the appropriate driver class.
    
    Replace `mydatabase`, `root`, and `root` with your actual database name, username, and password respectively.
 4. Start the Spring Boot application: You can now start your Spring Boot application. When the application starts up, it will use the provided database connection settings to connect to the MySQL database. If you're using a different database, ensure that you've uncommented the appropriate driver class and updated the connection properties accordingly.
 
## Features

- User registration and login functionality.
- Roles and permissions management for different types of users (admin, Normal,...).
- Ability to create, edit, and delete blog posts.
- Commenting system to allow readers to engage with the content.
- Mobile-friendly and responsive layout to ensure optimal viewing experience across different devices and screen sizes.
- Categorize and tag posts for organization.
## Screenshot of Application
News Feed :
 ![image](https://github.com/cdepanagoudra/Blogging-Application/assets/61723453/1102c8a7-a942-4598-8fbd-ead13efdaaf2)
Login Page : 
![image](https://github.com/cdepanagoudra/Blogging-Application/assets/61723453/a8bbbdba-4bb9-43a6-8941-5c4e62b143a7)
Signup Page : 
![image](https://github.com/cdepanagoudra/Blogging-Application/assets/61723453/af399f6d-7ee2-4a82-ac69-fe305ec43fd0)
Create Blog : 
![image](https://github.com/cdepanagoudra/Blogging-Application/assets/61723453/0cf82298-4e37-4a03-ab20-b898bd3950fe)

#BLOG DEMO
https://drive.google.com/file/d/1gUULEUCNqNlpBD0eejqtD4ebIaCYShqx/view?usp=drive_link
