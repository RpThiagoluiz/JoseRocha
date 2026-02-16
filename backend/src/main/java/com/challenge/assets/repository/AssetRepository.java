package com.challenge.assets.repository;

import com.challenge.assets.domain.Asset;
import com.challenge.assets.domain.enums.AssetStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
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

    /**
     * Finds assets with optional filters (name, serial number, status).
     * For name/serialNumber, pass empty string for "match all" (LIKE '%%').
     *
     * @param name         filter for name (partial, case-insensitive); use "" for match all
     * @param serialNumber filter for serial number (partial, case-insensitive); use "" for match all
     * @param status       optional filter for exact status match (null = no filter)
     * @return list of matching assets
     */
    @Query("SELECT a FROM Asset a WHERE " +
            "LOWER(a.name) LIKE LOWER(CONCAT('%', :name, '%')) AND " +
            "LOWER(a.serialNumber) LIKE LOWER(CONCAT('%', :serialNumber, '%')) AND " +
            "(:status IS NULL OR a.status = :status)")
    List<Asset> findWithFilters(@Param("name") String name,
                                @Param("serialNumber") String serialNumber,
                                @Param("status") AssetStatus status);
}
