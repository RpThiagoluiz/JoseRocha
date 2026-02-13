package com.challenge.assets.dto;

import com.challenge.assets.domain.enums.AssetStatus;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Response DTO for asset data (ID and all fields including audit dates).
 */
public record AssetResponse(
        UUID id,
        String name,
        String serialNumber,
        OffsetDateTime acquisitionDate,
        AssetStatus status,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {}
