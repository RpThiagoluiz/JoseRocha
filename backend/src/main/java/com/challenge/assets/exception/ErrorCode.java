package com.challenge.assets.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * Standardized error codes with associated HTTP status and messages.
 */
@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    INTERNAL_ERROR("GEN-001", "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR),
    VALIDATION_ERROR("GEN-002", "Validation failed", HttpStatus.BAD_REQUEST),
    ASSET_NOT_FOUND("AST-001", "Asset not found", HttpStatus.NOT_FOUND),
    ASSET_SERIAL_DUPLICATE("AST-002", "Serial number already exists", HttpStatus.CONFLICT),
    DELETE_ASSET_NOT_FOUND("DEL-001", "Asset not found for deletion", HttpStatus.NOT_FOUND);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;
}
