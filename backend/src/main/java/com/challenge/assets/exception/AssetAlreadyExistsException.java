package com.challenge.assets.exception;

/**
 * Thrown when an asset with the same serial number already exists.
 */
public class AssetAlreadyExistsException extends RuntimeException {

    private final ErrorCode errorCode;

    public AssetAlreadyExistsException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public AssetAlreadyExistsException(ErrorCode errorCode, String serialNumber) {
        super(errorCode.getMessage() + ": " + serialNumber);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode.getCode();
    }

    public ErrorCode getErrorCodeEnum() {
        return errorCode;
    }
}
