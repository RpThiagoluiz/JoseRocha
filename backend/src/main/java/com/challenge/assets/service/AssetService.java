package com.challenge.assets.service;

import com.challenge.assets.domain.Asset;
import com.challenge.assets.domain.enums.AssetStatus;
import com.challenge.assets.dto.AssetRequest;
import com.challenge.assets.dto.AssetResponse;
import com.challenge.assets.exception.AssetAlreadyExistsException;
import com.challenge.assets.exception.AssetNotFoundException;
import com.challenge.assets.exception.ErrorCode;
import com.challenge.assets.mapper.AssetMapper;
import com.challenge.assets.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Business logic for Asset CRUD operations.
 */
@Service
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepository repository;
    private final AssetMapper mapper;

    /**
     * Creates a new asset. Fails if serial number already exists.
     *
     * @param request creation data
     * @return created asset response
     * @throws AssetAlreadyExistsException if serial number is duplicate
     */
    @Transactional
    public AssetResponse create(AssetRequest request) {
        if (repository.existsBySerialNumber(request.serialNumber())) {
            throw new AssetAlreadyExistsException(ErrorCode.ASSET_SERIAL_DUPLICATE, request.serialNumber());
        }
        Asset entity = mapper.toEntity(request);
        entity = repository.save(entity);
        return mapper.toResponse(entity);
    }

    /**
     * Returns assets with optional filters. All parameters are optional; when null, no filter is applied.
     *
     * @param name         optional filter for name (partial, case-insensitive)
     * @param serialNumber optional filter for serial number (partial, case-insensitive)
     * @param status       optional filter for exact status match
     * @return list of matching assets
     */
    @Transactional(readOnly = true)
    public List<AssetResponse> findAll(String name, String serialNumber, AssetStatus status) {
        String searchName = name == null ? "" : name;
        String searchSerial = serialNumber == null ? "" : serialNumber;
        return repository.findWithFilters(searchName, searchSerial, status)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    /**
     * Returns an asset by ID.
     *
     * @throws AssetNotFoundException if not found
     */
    @Transactional(readOnly = true)
    public AssetResponse findById(UUID id) {
        Asset asset = repository.findById(id)
                .orElseThrow(() -> new AssetNotFoundException(ErrorCode.ASSET_NOT_FOUND, id));
        return mapper.toResponse(asset);
    }

    /**
     * Updates an asset by ID. Fails if not found or if new serial number is already used by another asset.
     *
     * @throws AssetNotFoundException     if asset not found
     * @throws AssetAlreadyExistsException if serial number is duplicate (for another asset)
     */
    @Transactional
    public AssetResponse update(UUID id, AssetRequest request) {
        Asset existing = repository.findById(id)
                .orElseThrow(() -> new AssetNotFoundException(ErrorCode.ASSET_NOT_FOUND, id));
        if (repository.existsBySerialNumberAndIdNot(request.serialNumber(), id)) {
            throw new AssetAlreadyExistsException(ErrorCode.ASSET_SERIAL_DUPLICATE, request.serialNumber());
        }
        Asset toSave = mapper.toEntity(request);
        toSave.setId(existing.getId());
        toSave.setCreatedAt(existing.getCreatedAt());
        return mapper.toResponse(repository.save(toSave));
    }

    /**
     * Deletes an asset by ID.
     *
     * @throws AssetNotFoundException if not found
     */
    @Transactional
    public void deleteById(UUID id) {
        if (!repository.existsById(id)) {
            throw new AssetNotFoundException(ErrorCode.DELETE_ASSET_NOT_FOUND, id);
        }
        repository.deleteById(id);
    }
}
