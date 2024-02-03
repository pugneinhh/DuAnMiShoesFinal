package com.example.backend.util;

import com.example.backend.util.security.Authentication;
import com.example.backend.util.security.JwtAuthenFiltertication;
import com.example.backend.util.security.JwtAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.backend.util.security.Authentication;
import com.example.backend.util.security.JwtAuthenticationEntryPoint;
import com.example.backend.util.security.JwtAuthenFiltertication;
@Configuration
@EnableWebSecurity
@EnableAutoConfiguration
public class SecurityConfig {
    @Autowired
    private JwtAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    private JwtAuthenFiltertication authenFiltertication;

    @Autowired
    private Authentication authenticationProvider;


    private UserDetailsService userDetailsService;

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests
                        (authorize -> authorize
                                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                                        .requestMatchers("/**","/api/payment-vnpay","/api/payment-callback").permitAll()
                                        .requestMatchers("/admin/hang/**").permitAll()
//                                       .requestMatchers("/api/admin/**").permitAll()
                                        .requestMatchers("/api/khach-hang/user/**").permitAll()
                                        .requestMatchers("/api/khach-hang/hoa-don-chi-tiet/**").permitAll()
                                        .requestMatchers("/api/khach-hang/checkout").permitAll()
                                        .requestMatchers("/api/getUseNameByToken/**").permitAll()
                                        .requestMatchers("/api/khach-hang/user-voucher/**").permitAll()
                                        .requestMatchers("/api/genToken/**").permitAll()
                                        .requestMatchers("/ws/**").permitAll()
                                        .requestMatchers("/admin/hoa-don/**").hasAnyRole("nhan_vien","admin")
                                        .requestMatchers("/api/admin/hoa-don-chi-tiet/**").hasAnyRole("nhan_vien","admin")
                                        .requestMatchers(HttpMethod.GET,"/api/admin/**").hasAnyRole("nhan_vien","admin")
                                        .requestMatchers(HttpMethod.POST,"/api/admin/**").hasAnyRole("nhan_vien","admin")
                                        .requestMatchers(HttpMethod.PUT,"/api/admin/**").hasAnyRole("admin")
                                        .requestMatchers(HttpMethod.DELETE,"/api/admin/**").hasAnyRole("admin")
                                        .anyRequest().permitAll()
                        )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(authenticationEntryPoint)
                )
                .authenticationProvider(authenticationProvider)
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .headers(headers -> headers
                        .frameOptions().disable()
                )
                .addFilterBefore(authenFiltertication, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
