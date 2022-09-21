package org.molly.huey.repositories;

import org.molly.huey.entities.Palette;
import org.molly.huey.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface PaletteRepository extends JpaRepository<Palette, Long> {
    List<Palette> findAllByUserEquals(User user);
}
