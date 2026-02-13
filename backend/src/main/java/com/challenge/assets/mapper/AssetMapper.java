package com.challenge.assets.mapper;

import com.challenge.assets.domain.Asset;
import com.challenge.assets.domain.enums.AssetStatus;
import com.challenge.assets.dto.AssetRequest;
import com.challenge.assets.dto.AssetResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

/**
 * MapStruct mapper for Asset entity and DTOs.
 */
@Mapper(componentModel = "spring")
public interface AssetMapper {

    /**
     * Maps a request DTO to an entity. Status defaults to AVAILABLE when null.
     *
     * @param request the request DTO
     * @return the entity (without id and audit fields, for persistence)
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", source = "status", qualifiedByName = "defaultStatus")
    Asset toEntity(AssetRequest request);

    /**
     * Maps an entity to a response DTO.
     *
     * @param asset the entity
     * @return the response DTO
     */
    AssetResponse toResponse(Asset asset);

    @Named("defaultStatus")
    default AssetStatus defaultStatus(AssetStatus status) {
        return status != null ? status : AssetStatus.AVAILABLE;
    }
}
