package org.molly.huey.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.molly.huey.dtos.PaletteDto;

import javax.persistence.*;

@Entity
@Table(name = "Palettes")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Palette {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "text")
    private String body;

    @ManyToOne
    @JsonBackReference
    private User user;

    //constructor that accepts a Dto argument
    public Palette(PaletteDto paletteDto){
        if (paletteDto.getBody() != null){
            this.body =paletteDto.getBody();}
    }
}
