package org.molly.huey.services;

import org.molly.huey.dtos.PaletteDto;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface PaletteService {

    List<PaletteDto> getAllPalettesByUserId(Long userId);

    @Transactional
    void addPalette(PaletteDto paletteDto, Long userId);

    @Transactional
    void deletePaletteById(Long paletteId);

    @Transactional
    void updatePaletteById(PaletteDto paletteDto);

    Optional<PaletteDto> getPaletteById(Long paletteId);
}