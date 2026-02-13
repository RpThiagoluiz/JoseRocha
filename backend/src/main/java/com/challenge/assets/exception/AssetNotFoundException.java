package com.challenge.assets.exception;

import java.util.UUID;

/**
 * Thrown when an asset is not found by ID.
 */
public class AssetNotFoundException extends RuntimeException {

    private final ErrorCode errorCode;

    public AssetNotFoundException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public AssetNotFoundException(ErrorCode errorCode, UUID id) {
        super(errorCode.getMessage() + ": " + id);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode.getCode();
    }

    public ErrorCode getErrorCodeEnum() {
        return errorCode;
    }
}
