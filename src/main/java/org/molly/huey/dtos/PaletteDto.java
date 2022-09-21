package org.molly.huey.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.molly.huey.entities.Palette;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaletteDto implements Serializable {
    private Long id;
    private String body;
    private UserDto userDto;

    public PaletteDto(Palette palette){
        if (palette.getId() !=null){
            this.id = palette.getId();
        }
        if (palette.getBody() !=null){
            this.body = palette.getBody();
        }
    }
}
