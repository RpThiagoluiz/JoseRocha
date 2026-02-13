package com.challenge.assets.dto;

import com.challenge.assets.domain.enums.AssetStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

/**
 * Request DTO for creating or updating an asset.
 * Status is optional; defaults to AVAILABLE when null (handled in mapper).
 */
public record AssetRequest(
        @NotBlank(message = "name must not be blank") String name,
        @NotBlank(message = "serialNumber must not be blank") String serialNumber,
        @NotNull(message = "acquisitionDate must not be null") OffsetDateTime acquisitionDate,
        AssetStatus status
) {}
