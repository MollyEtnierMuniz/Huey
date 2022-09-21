package org.molly.huey.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.molly.huey.dtos.UserDto;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Users")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;
    @Column
    private String password;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;}

    public void setUsername(String username) {
        this.username = username;}

    public String getPassword() {
        return password;}

    public void setPassword(String password) {
        this.password = password;}

    //need getters, setters, constructors for palette



    public User(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    private Set<Palette> paletteSet = new HashSet<>();

    //constructor that accepts a Dto argument
    public User(UserDto userDto){
        if (userDto.getUsername() !=null) {
            this.username = userDto.getUsername();
        }
        if (userDto.getPassword() !=null) {
            this.password = userDto.getPassword();
        }
    }
}
