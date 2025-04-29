package com.f1.f1_race_explorer.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    // Remove addCorsMappings to avoid CORS config conflicts
}