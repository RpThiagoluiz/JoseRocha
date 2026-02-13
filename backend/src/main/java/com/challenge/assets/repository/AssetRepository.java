package com.challenge.assets.repository;

import com.challenge.assets.domain.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * JPA repository for {@link Asset} persistence.
 */
@Repository
public interface AssetRepository extends JpaRepository<Asset, UUID> {

    /**
     * Checks whether an asset with the given serial number already exists.
     *
     * @param serialNumber the serial number to check
     * @return true if an asset exists with this serial number, false otherwise
     */
    boolean existsBySerialNumber(String serialNumber);

    /**
     * Checks whether an asset with the given serial number exists with a different ID (for update validation).
     *
     * @param serialNumber the serial number to check
     * @param id           the asset ID to exclude (e.g. current entity being updated)
     * @return true if another asset exists with this serial number
     */
    boolean existsBySerialNumberAndIdNot(String serialNumber, UUID id);
}
