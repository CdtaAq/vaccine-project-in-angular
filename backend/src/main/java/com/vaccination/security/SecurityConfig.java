package com.vaccination.security;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
  @Autowired JwtFilter jwtFilter;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf().disable()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .authorizeHttpRequests()
        .requestMatchers("/api/auth/**","/api/public/**").permitAll()
        .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
        .requestMatchers("/api/user/**","/api/appointments/**","/api/payments/**").hasAuthority("ROLE_USER")
        .anyRequest().authenticated();

    http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }
}
