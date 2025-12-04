// apps/backend/services/scaffolds/spring_boot.js
export function springBootScaffold(projectName = 'my-spring-app') {
  return {
    [`${projectName}/pom.xml`]: `<project>
  <!-- 실제로는 Spring Initializr를 쓰는게 좋습니다 -->
</project>`,
    [`${projectName}/src/main/java/com/example/DemoApplication.java`]: `package com.example;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
public class DemoApplication {
  public static void main(String[] args){ SpringApplication.run(DemoApplication.class, args); }
}`
  };
}