package com.lingo.lingoalpha1_0.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    //because of spring security i was being redirected to a log in page, i need to use this config to authorize the endpoints before log in
    //THIS IS INITIAL PROTOTYPE, ONCE PROJECT IS SHAPING UP BETTER I WILL TRANSITION TO JWT AND SPRING SECURITY AUTH
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/index.html",
                                "/api/auth/register",
                                "/api/auth/login",
                                "/api/auth.**"
                                , "/favicon.ico",
                                "/error",
                                "/css/**",
                                "/js/**",
                                "/images/**",
                                "/webjars/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )

                .formLogin(form -> form.disable())
                .httpBasic(httpBasic -> httpBasic.disable()); // optional

        return http.build();
    }
}
