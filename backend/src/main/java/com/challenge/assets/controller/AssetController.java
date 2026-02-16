package com.challenge.assets.controller;

import com.challenge.assets.domain.enums.AssetStatus;
import com.challenge.assets.dto.AssetRequest;
import com.challenge.assets.dto.AssetResponse;
import com.challenge.assets.service.AssetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.UUID;

/**
 * REST controller for Asset CRUD.
 * All errors return structured {@link com.challenge.assets.dto.error.ApiErrorResponse} (400, 404, 409, 500).
 */
@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RequestMapping("/assets")
@RequiredArgsConstructor
@Tag(name = "Assets", description = "Asset CRUD API")
public class AssetController {

    private final AssetService service;

    @Operation(summary = "Listar todos os ativos", description = "Retorna uma lista de ativos. Pode ser filtrada opcionalmente por nome, número de série ou status.")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = com.challenge.assets.dto.error.ApiErrorResponse.class)))
    })
    public ResponseEntity<List<AssetResponse>> getAll(
            @Parameter(description = "Filtra pelo nome do ativo (busca parcial)")
            @RequestParam(required = false) String name,

            @Parameter(description = "Filtra pelo número de série (busca parcial)")
            @RequestParam(required = false) String serialNumber,

            @Parameter(description = "Filtra pelo status exato do ativo")
            @RequestParam(required = false) AssetStatus status) {

        return ResponseEntity.ok(service.findAll(name, serialNumber, status));
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get asset by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Asset not found", content = @Content(schema = @Schema(implementation = com.challenge.assets.dto.error.ApiErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = com.challenge.assets.dto.error.ApiErrorResponse.class)))
    })
    public AssetResponse getById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create asset")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created"),
            @ApiResponse(responseCode = "400", description = "Validation error", content = @Content(schema = @Schema(implementation = com.challenge.assets.dto.error.ApiErrorResponse.class))),
            @ApiResponse(responseCode = "409", description = "Serial number already exists", content = @Content(schema = @Schema(implementation = com.challenge.assets.dto.error.ApiErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = com.challenge.assets.dto.error.ApiErrorResponse.class)))
    })
    public ResponseEntity<AssetResponse> create(@Valid @RequestBody AssetRequest request) {
        AssetResponse created = service.create(request);
        return ResponseEntity
                .created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.id()).toUri())
                .body(created);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update asset by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Validation error", content = @Content(schema = @Schema(implementation = com.challenge.assets.dto.error.ApiErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "Asset not found", content = @Content(schema = @Schema(implementation = com.challenge.assets.dto.error.ApiErrorResponse.class))),
            @ApiResponse(responseCode = "409", description = "Serial number already exists", content = @Content(schema = @Schema(implementation = com.challenge.assets.dto.error.ApiErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = com.challenge.assets.dto.error.ApiErrorResponse.class)))
    })
    public AssetResponse update(@PathVariable UUID id, @Valid @RequestBody AssetRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete asset by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No content"),
            @ApiResponse(responseCode = "404", description = "Asset not found", content = @Content(schema = @Schema(implementation = com.challenge.assets.dto.error.ApiErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = com.challenge.assets.dto.error.ApiErrorResponse.class)))
    })
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
