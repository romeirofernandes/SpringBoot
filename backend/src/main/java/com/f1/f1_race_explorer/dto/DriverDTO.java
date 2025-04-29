package com.f1.f1_race_explorer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String code;
    private int number;
    private String nationality;
    private LocalDate dateOfBirth;
    private Long teamId;
    private String teamName;
    
    // Manual getters and setters in case Lombok is not working
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getCode() {
        return code;
    }
    
    public void setCode(String code) {
        this.code = code;
    }
    
    public int getNumber() {
        return number;
    }
    
    public void setNumber(int number) {
        this.number = number;
    }
    
    public String getNationality() {
        return nationality;
    }
    
    public void setNationality(String nationality) {
        this.nationality = nationality;
    }
    
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
    
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    
    public Long getTeamId() {
        return teamId;
    }
    
    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }
    
    public String getTeamName() {
        return teamName;
    }
    
    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
    
    // Manual builder implementation if Lombok builder is not working
    public static DriverDTOBuilder builder() {
        return new DriverDTOBuilder();
    }
    
    public static class DriverDTOBuilder {
        private Long id;
        private String firstName;
        private String lastName;
        private String code;
        private int number;
        private String nationality;
        private LocalDate dateOfBirth;
        private Long teamId;
        private String teamName;
        
        public DriverDTOBuilder id(Long id) {
            this.id = id;
            return this;
        }
        
        public DriverDTOBuilder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }
        
        public DriverDTOBuilder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }
        
        public DriverDTOBuilder code(String code) {
            this.code = code;
            return this;
        }
        
        public DriverDTOBuilder number(int number) {
            this.number = number;
            return this;
        }
        
        public DriverDTOBuilder nationality(String nationality) {
            this.nationality = nationality;
            return this;
        }
        
        public DriverDTOBuilder dateOfBirth(LocalDate dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
            return this;
        }
        
        public DriverDTOBuilder teamId(Long teamId) {
            this.teamId = teamId;
            return this;
        }
        
        public DriverDTOBuilder teamName(String teamName) {
            this.teamName = teamName;
            return this;
        }
        
        public DriverDTO build() {
            return new DriverDTO(id, firstName, lastName, code, number, nationality, dateOfBirth, teamId, teamName);
        }
    }
}