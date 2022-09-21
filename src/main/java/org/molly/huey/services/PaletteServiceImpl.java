package org.molly.huey.services;

import org.molly.huey.dtos.PaletteDto;
import org.molly.huey.entities.Palette;
import org.molly.huey.entities.User;
import org.molly.huey.repositories.PaletteRepository;
import org.molly.huey.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaletteServiceImpl implements PaletteService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PaletteRepository paletteRepository;

@Override
public List<PaletteDto> getAllPalettesByUserId(Long userId){
    Optional<User> userOptional = userRepository.findById(userId);
    if (userOptional.isPresent()){
        List<Palette> paletteList = paletteRepository.findAllByUserEquals(userOptional.get());
        return paletteList.stream().map(palette -> new PaletteDto(palette)).collect(Collectors.toList());
    }
    return Collections.emptyList();
}

@Override
@Transactional
public void addPalette(PaletteDto paletteDto, Long userId) {
    Optional<User> userOptional = userRepository.findById(userId);
    Palette palette =new Palette(paletteDto);
    userOptional.ifPresent(palette::setUser);
    paletteRepository.saveAndFlush(palette);
}

@Override
@Transactional
public void deletePaletteById(Long paletteId){
    Optional<Palette> paletteOptional =paletteRepository.findById(paletteId);
    paletteOptional.ifPresent(palette -> paletteRepository.delete(palette));
}

@Override
@Transactional
public void updatePaletteById(PaletteDto paletteDto){
    Optional<Palette> paletteOptional = paletteRepository.findById(paletteDto.getId());
    paletteOptional.ifPresent(palette -> {
        palette.setBody(paletteDto.getBody());
        paletteRepository.saveAndFlush(palette);});
}
@Override
public Optional<PaletteDto> getPaletteById(Long paletteId) {
    Optional<Palette> paletteOptional = paletteRepository.findById(paletteId);
    if (paletteOptional.isPresent()) {
        return Optional.of(new PaletteDto(paletteOptional.get()));
    } return Optional.empty();}
}



