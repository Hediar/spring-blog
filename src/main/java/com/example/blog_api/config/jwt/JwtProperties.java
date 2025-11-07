package com.example.blog_api.config.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
@ConfigurationProperties("jwt") // java 클래스에 property값을 가져와서 사용하는 에너테이션
public class JwtProperties {
    private String issuer;
    private String secretKey;
}
