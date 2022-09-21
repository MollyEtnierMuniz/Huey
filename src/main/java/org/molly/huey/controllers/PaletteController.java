package org.molly.huey.controllers;

import org.molly.huey.dtos.PaletteDto;
import org.molly.huey.services.PaletteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("api/v1/palettes")
public class PaletteController {

    @Autowired
    private PaletteService paletteService;

    @GetMapping("/user/{userId}")
    public List<PaletteDto> getPalettesByUser(@PathVariable Long userId){
        return paletteService.getAllPalettesByUserId(userId);
    }

    @GetMapping("/{paletteId}")
    public Optional<PaletteDto> getPaletteById(@PathVariable Long paletteId){
        return paletteService.getPaletteById(paletteId);
    }

    @PostMapping("/user/{userId}")
    public void addPalette(@RequestBody PaletteDto paletteDto, @PathVariable Long userId){
        paletteService.addPalette(paletteDto, userId);
    }

    @DeleteMapping("/{paletteId}")
    public void deletePaletteById(@PathVariable Long paletteId){
        paletteService.deletePaletteById(paletteId);
    }

    @PutMapping
    public void updatePalette(@RequestBody PaletteDto paletteDto){
        paletteService.updatePaletteById(paletteDto);
    }
}
