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
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AssetServiceTest {

    @Mock
    private AssetRepository repository;

    @Mock
    private AssetMapper mapper;

    @InjectMocks
    private AssetService service;

    private static final OffsetDateTime SAMPLE_DATE = OffsetDateTime.parse("2024-01-15T10:00:00Z");

    @Test
    @DisplayName("create should call repository.save when serial number is unique")
    void create_success_callsRepositorySave() {
        AssetRequest request = new AssetRequest("Laptop", "SN-001", SAMPLE_DATE, null);
        Asset entity = Asset.builder()
                .name("Laptop")
                .serialNumber("SN-001")
                .acquisitionDate(SAMPLE_DATE)
                .status(AssetStatus.AVAILABLE)
                .build();
        Asset saved = Asset.builder()
                .id(UUID.randomUUID())
                .name("Laptop")
                .serialNumber("SN-001")
                .acquisitionDate(SAMPLE_DATE)
                .status(AssetStatus.AVAILABLE)
                .createdAt(OffsetDateTime.now())
                .updatedAt(OffsetDateTime.now())
                .build();
        AssetResponse response = new AssetResponse(
                saved.getId(), "Laptop", "SN-001", SAMPLE_DATE,
                AssetStatus.AVAILABLE, saved.getCreatedAt(), saved.getUpdatedAt());

        when(repository.existsBySerialNumber("SN-001")).thenReturn(false);
        when(mapper.toEntity(request)).thenReturn(entity);
        when(repository.save(any(Asset.class))).thenReturn(saved);
        when(mapper.toResponse(saved)).thenReturn(response);

        AssetResponse result = service.create(request);

        assertThat(result).isEqualTo(response);
        verify(repository).save(any(Asset.class));
    }

    @Test
    @DisplayName("create should throw AssetAlreadyExistsException with ASSET_SERIAL_DUPLICATE when serial exists")
    void create_duplicateSerial_throwsWithErrorCode() {
        AssetRequest request = new AssetRequest("Laptop", "SN-001", SAMPLE_DATE, null);
        when(repository.existsBySerialNumber("SN-001")).thenReturn(true);

        assertThatThrownBy(() -> service.create(request))
                .isInstanceOf(AssetAlreadyExistsException.class)
                .satisfies(ex -> {
                    String code = ((AssetAlreadyExistsException) ex).getErrorCode();
                    assertThat(code).isEqualTo(ErrorCode.ASSET_SERIAL_DUPLICATE.getCode());
                    assertThat(code).isEqualTo("AST-002");
                });

        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("deleteById should throw AssetNotFoundException with DELETE_ASSET_NOT_FOUND when asset does not exist")
    void delete_notFound_throwsWithDel001() {
        UUID id = UUID.randomUUID();
        when(repository.existsById(id)).thenReturn(false);

        assertThatThrownBy(() -> service.deleteById(id))
                .isInstanceOf(AssetNotFoundException.class)
                .satisfies(ex -> {
                    String code = ((AssetNotFoundException) ex).getErrorCode();
                    assertThat(code).isEqualTo(ErrorCode.DELETE_ASSET_NOT_FOUND.getCode());
                    assertThat(code).isEqualTo("DEL-001");
                });

        verify(repository, never()).deleteById(any());
    }
}
